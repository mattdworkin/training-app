// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const csv = require('csv-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5002;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || '';
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || '';
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || `${CLIENT_URL}/devices`;
const STRAVA_SCOPE = process.env.STRAVA_SCOPE || 'read,activity:read_all';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';
const STRAVA_ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities';

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});
app.use(limiter);

const allowedOrigins = [CLIENT_URL, 'http://localhost:3000', process.env.PRODUCTION_URL].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

const trainingSchedules = [];
const csvFilePath = path.join(__dirname, 'data', 'training_schedules.csv');

if (!fs.existsSync(csvFilePath)) {
  console.error('Error: training_schedules.csv file not found');
  process.exit(1);
}

try {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      if (data && data.day_of_week && data.workout_type) {
        trainingSchedules.push(data);
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error);
      process.exit(1);
    })
    .on('end', () => {
      if (trainingSchedules.length === 0) {
        console.error('Error: No valid training schedules found in CSV');
        process.exit(1);
      }
      console.log('Training schedules loaded successfully');
    });
} catch (error) {
  console.error('Error loading training schedules:', error);
  process.exit(1);
}

// In-memory integration state. This is intentionally simple for MVP behavior.
const integrationStore = {
  stravaStates: new Map(),
  stravaConnections: new Map(),
  appleHealthConnections: new Map(),
};

const STRAVA_STATE_TTL_MS = 10 * 60 * 1000;

function generateId(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString('hex')}`;
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function toIsoDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  // Some Apple exports use "YYYY-MM-DD HH:mm:ss -0700". Normalize slightly.
  const normalized = String(value).replace(' ', 'T');
  const retry = new Date(normalized);
  if (!Number.isNaN(retry.getTime())) {
    return retry.toISOString();
  }

  return null;
}

function normalizeDistanceKm(value, unit) {
  const distance = toNumber(value);
  if (distance === null) {
    return null;
  }

  const unitLower = String(unit || '').toLowerCase();
  if (!unitLower || unitLower === 'km' || unitLower === 'kilometer' || unitLower === 'kilometers') {
    return distance;
  }
  if (unitLower === 'm' || unitLower === 'meter' || unitLower === 'meters') {
    return distance / 1000;
  }
  if (unitLower === 'mi' || unitLower === 'mile' || unitLower === 'miles') {
    return distance * 1.60934;
  }

  return distance;
}

function normalizeDurationMin(value, unit) {
  const duration = toNumber(value);
  if (duration === null) {
    return null;
  }

  const unitLower = String(unit || '').toLowerCase();
  if (!unitLower || unitLower === 'min' || unitLower === 'minute' || unitLower === 'minutes') {
    return duration;
  }
  if (unitLower === 's' || unitLower === 'sec' || unitLower === 'second' || unitLower === 'seconds') {
    return duration / 60;
  }
  if (unitLower === 'h' || unitLower === 'hr' || unitLower === 'hour' || unitLower === 'hours') {
    return duration * 60;
  }

  return duration;
}

function normalizeAppleWorkouts(workouts) {
  const normalized = workouts
    .map((workout) => {
      const startDate = toIsoDate(workout.startDate || workout.date || workout.workoutDate);

      const distanceKm =
        normalizeDistanceKm(workout.distanceKm, 'km') ??
        normalizeDistanceKm(workout.distance, workout.distanceUnit) ??
        normalizeDistanceKm(workout.totalDistance, workout.totalDistanceUnit) ??
        normalizeDistanceKm(workout.distanceMeters, 'm') ??
        normalizeDistanceKm(workout.distanceMiles, 'mi');

      const durationMin =
        normalizeDurationMin(workout.durationMin, 'min') ??
        normalizeDurationMin(workout.duration, workout.durationUnit) ??
        normalizeDurationMin(workout.totalDuration, workout.totalDurationUnit) ??
        normalizeDurationMin(workout.durationSeconds, 's');

      const calories = toNumber(workout.calories);
      const type = workout.type || workout.workoutType || 'Running';

      return {
        startDate,
        distanceKm: distanceKm === null ? null : Number(distanceKm.toFixed(2)),
        durationMin: durationMin === null ? null : Number(durationMin.toFixed(1)),
        calories: calories === null ? null : Number(calories.toFixed(1)),
        type,
        source: workout.source || 'Apple Health',
      };
    })
    .filter((workout) => workout.startDate && ((workout.distanceKm && workout.distanceKm > 0) || (workout.durationMin && workout.durationMin > 0)));

  normalized.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  return normalized;
}

function summarizeWorkouts(workouts) {
  const totalDistanceKm = workouts.reduce((sum, workout) => sum + (workout.distanceKm || 0), 0);
  const totalDurationMin = workouts.reduce((sum, workout) => sum + (workout.durationMin || 0), 0);

  return {
    workoutCount: workouts.length,
    totalDistanceKm: Number(totalDistanceKm.toFixed(2)),
    totalDurationHours: Number((totalDurationMin / 60).toFixed(2)),
    latestWorkoutDate: workouts[0] ? workouts[0].startDate : null,
  };
}

function stravaConfigured() {
  return Boolean(STRAVA_CLIENT_ID && STRAVA_CLIENT_SECRET);
}

function cleanupExpiredStravaStates() {
  const now = Date.now();
  for (const [state, details] of integrationStore.stravaStates.entries()) {
    if (now - details.createdAt > STRAVA_STATE_TTL_MS) {
      integrationStore.stravaStates.delete(state);
    }
  }
}

async function postStravaToken(params) {
  const response = await fetch(STRAVA_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.message || data?.errors?.[0]?.resource || 'Failed to authenticate with Strava';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

async function ensureFreshStravaToken(connectionId) {
  const connection = integrationStore.stravaConnections.get(connectionId);
  if (!connection) {
    const error = new Error('Strava connection not found');
    error.status = 404;
    throw error;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!connection.expiresAt || connection.expiresAt - now > 120) {
    return connection;
  }

  const refreshed = await postStravaToken({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: connection.refreshToken,
  });

  const updatedConnection = {
    ...connection,
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token,
    expiresAt: refreshed.expires_at,
    athlete: refreshed.athlete || connection.athlete,
  };

  integrationStore.stravaConnections.set(connectionId, updatedConnection);
  return updatedConnection;
}

function validatePlanRequest(body) {
  const { age, weight, gender, weeklyMileage } = body;

  if (age === undefined || weight === undefined || gender === undefined || weeklyMileage === undefined) {
    return { valid: false, message: 'Missing required fields' };
  }
  if (typeof age !== 'number' || age < 13 || age > 100) {
    return { valid: false, message: 'Age must be a number between 13 and 100' };
  }
  if (typeof weight !== 'number' || weight < 30 || weight > 200) {
    return { valid: false, message: 'Weight must be a number between 30 and 200' };
  }
  if (!['male', 'female', 'other'].includes(String(gender).toLowerCase())) {
    return { valid: false, message: 'Gender must be male, female, or other' };
  }
  if (typeof weeklyMileage !== 'number' || weeklyMileage < 0 || weeklyMileage > 50) {
    return { valid: false, message: 'Weekly mileage must be a number between 0 and 50' };
  }

  return { valid: true };
}

app.get('/api/training-schedules', (req, res, next) => {
  try {
    if (!trainingSchedules.length) {
      res.status(404).json({
        status: 'error',
        message: 'No training schedules available',
      });
      return;
    }

    res.json(trainingSchedules);
  } catch (error) {
    next(error);
  }
});

app.post('/api/generate-plan', (req, res, next) => {
  try {
    const validation = validatePlanRequest(req.body);
    if (!validation.valid) {
      res.status(400).json({
        status: 'error',
        message: validation.message,
      });
      return;
    }

    const { age, weight, gender, weeklyMileage } = req.body;

    let targetMileage = weeklyMileage;
    const ageFactor = age > 40 ? 0.95 - (age - 40) * 0.01 : 1.0;
    const weightFactor = weight > 80 ? 0.95 - (weight - 80) * 0.005 : 1.0;
    const genderFactor = String(gender).toLowerCase() === 'female' ? 0.9 : 1.0;

    targetMileage = weeklyMileage * ageFactor * weightFactor * genderFactor;
    const maxIncrease = weeklyMileage * 1.1;
    targetMileage = Math.min(targetMileage, maxIncrease);
    targetMileage = Math.round(targetMileage);

    let fitnessLevel = 'Advanced';
    if (targetMileage <= 10) {
      fitnessLevel = 'Beginner';
    } else if (targetMileage <= 25) {
      fitnessLevel = 'Intermediate';
    }

    const filteredSchedules = trainingSchedules.filter((schedule) => schedule.level_of_fitness === fitnessLevel);
    if (!filteredSchedules.length) {
      res.status(404).json({
        status: 'error',
        message: `No workout schedules found for fitness level: ${fitnessLevel}`,
      });
      return;
    }

    filteredSchedules.sort((a, b) => parseInt(a.day_of_week, 10) - parseInt(b.day_of_week, 10));

    const startDate = new Date();
    const schedule = [];
    for (let i = 0; i < 7; i += 1) {
      const dayOfWeek = ((startDate.getDay() + i) % 7) + 1;
      const workout =
        filteredSchedules.find((entry) => parseInt(entry.day_of_week, 10) === dayOfWeek) ||
        filteredSchedules[0];

      const workoutDate = new Date(startDate);
      workoutDate.setDate(startDate.getDate() + i);

      schedule.push({
        workoutType: workout.workout_type,
        distance: parseFloat(workout.distance),
        duration: parseInt(workout.duration, 10),
        pace: workout.pace,
        date: workoutDate.toISOString().split('T')[0],
        formattedDate: workoutDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      });
    }

    res.json({
      status: 'success',
      fitnessLevel,
      targetWeeklyMileage: targetMileage,
      trainingPlan: schedule,
    });
  } catch (error) {
    next(error);
  }
});

// -------- Strava Integration --------
app.get('/api/integrations/strava/config', (req, res) => {
  res.json({
    configured: stravaConfigured(),
    redirectUri: STRAVA_REDIRECT_URI,
    scope: STRAVA_SCOPE,
  });
});

app.get('/api/integrations/strava/auth-url', (req, res) => {
  if (!stravaConfigured()) {
    res.status(503).json({
      status: 'error',
      message: 'Strava integration is not configured on the server.',
    });
    return;
  }

  cleanupExpiredStravaStates();

  const redirectUri = req.query.redirectUri || STRAVA_REDIRECT_URI;
  const state = generateId('strava_state');
  integrationStore.stravaStates.set(state, {
    createdAt: Date.now(),
    redirectUri,
  });

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${encodeURIComponent(
    STRAVA_CLIENT_ID
  )}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&approval_prompt=auto&scope=${encodeURIComponent(STRAVA_SCOPE)}&state=${encodeURIComponent(state)}`;

  res.json({
    status: 'success',
    authUrl,
    state,
  });
});

app.post('/api/integrations/strava/exchange-code', async (req, res, next) => {
  try {
    if (!stravaConfigured()) {
      res.status(503).json({
        status: 'error',
        message: 'Strava integration is not configured on the server.',
      });
      return;
    }

    cleanupExpiredStravaStates();

    const { code, state } = req.body;
    if (!code || !state) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required Strava OAuth fields.',
      });
      return;
    }

    if (!integrationStore.stravaStates.has(state)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired Strava OAuth state. Please reconnect.',
      });
      return;
    }

    integrationStore.stravaStates.delete(state);

    const tokenData = await postStravaToken({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    const connectionId = generateId('strava');
    integrationStore.stravaConnections.set(connectionId, {
      id: connectionId,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: tokenData.expires_at,
      athlete: tokenData.athlete || null,
      lastSync: null,
      lastSummary: null,
    });

    res.json({
      status: 'success',
      connected: true,
      connectionId,
      athlete: tokenData.athlete || null,
      expiresAt: tokenData.expires_at,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/integrations/strava/status/:connectionId', async (req, res, next) => {
  try {
    const { connectionId } = req.params;
    if (!integrationStore.stravaConnections.has(connectionId)) {
      res.json({ connected: false });
      return;
    }

    const connection = await ensureFreshStravaToken(connectionId);
    res.json({
      connected: true,
      connectionId,
      athlete: connection.athlete,
      expiresAt: connection.expiresAt,
      lastSync: connection.lastSync,
      lastSummary: connection.lastSummary,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/integrations/strava/sync', async (req, res, next) => {
  try {
    const { connectionId, limit } = req.body;
    const safeLimit = Math.min(Math.max(parseInt(limit || 20, 10), 1), 100);

    if (!connectionId || !integrationStore.stravaConnections.has(connectionId)) {
      res.status(404).json({
        status: 'error',
        message: 'Strava connection not found.',
      });
      return;
    }

    const connection = await ensureFreshStravaToken(connectionId);
    const response = await fetch(`${STRAVA_ACTIVITIES_URL}?per_page=${safeLimit}&page=1`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${connection.accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.message || 'Failed to fetch Strava activities.';
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }

    const runningTypes = new Set(['Run', 'VirtualRun', 'TrailRun']);
    const activities = Array.isArray(data)
      ? data
          .filter((activity) => runningTypes.has(activity.type))
          .map((activity) => ({
            id: activity.id,
            name: activity.name,
            type: activity.type,
            startDate: activity.start_date,
            distanceKm: Number(((activity.distance || 0) / 1000).toFixed(2)),
            movingTimeMin: Number(((activity.moving_time || 0) / 60).toFixed(1)),
            averagePaceMinPerKm:
              activity.average_speed && activity.average_speed > 0
                ? Number((1000 / activity.average_speed / 60).toFixed(2))
                : null,
            elevationGainM: Number((activity.total_elevation_gain || 0).toFixed(1)),
          }))
      : [];

    const totalDistanceKm = activities.reduce((sum, activity) => sum + activity.distanceKm, 0);
    const totalMovingTimeMin = activities.reduce((sum, activity) => sum + activity.movingTimeMin, 0);

    const summary = {
      activityCount: activities.length,
      totalDistanceKm: Number(totalDistanceKm.toFixed(2)),
      totalMovingHours: Number((totalMovingTimeMin / 60).toFixed(2)),
      syncedAt: new Date().toISOString(),
    };

    integrationStore.stravaConnections.set(connectionId, {
      ...connection,
      lastSync: summary.syncedAt,
      lastSummary: summary,
    });

    res.json({
      status: 'success',
      summary,
      activities,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/integrations/strava/disconnect', (req, res) => {
  const { connectionId } = req.body;
  if (connectionId) {
    integrationStore.stravaConnections.delete(connectionId);
  }

  res.json({
    status: 'success',
    connected: false,
  });
});

// -------- Apple Health Import Integration --------
app.post('/api/integrations/apple-health/import', (req, res, next) => {
  try {
    const { connectionId, workouts } = req.body;
    if (!Array.isArray(workouts) || workouts.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'No Apple Health workouts provided.',
      });
      return;
    }

    if (workouts.length > 10000) {
      res.status(400).json({
        status: 'error',
        message: 'Payload too large. Please import 10,000 workouts or fewer at a time.',
      });
      return;
    }

    const normalized = normalizeAppleWorkouts(workouts);
    if (normalized.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'No valid running workouts found in the Apple Health data.',
      });
      return;
    }

    const id =
      connectionId && integrationStore.appleHealthConnections.has(connectionId)
        ? connectionId
        : generateId('apple');

    const summary = summarizeWorkouts(normalized);
    const syncedAt = new Date().toISOString();

    integrationStore.appleHealthConnections.set(id, {
      id,
      lastSync: syncedAt,
      summary,
      workouts: normalized,
    });

    res.json({
      status: 'success',
      connected: true,
      connectionId: id,
      lastSync: syncedAt,
      summary,
      recentWorkouts: normalized.slice(0, 25),
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/integrations/apple-health/status/:connectionId', (req, res) => {
  const { connectionId } = req.params;
  const connection = integrationStore.appleHealthConnections.get(connectionId);
  if (!connection) {
    res.json({ connected: false });
    return;
  }

  res.json({
    connected: true,
    connectionId,
    lastSync: connection.lastSync,
    summary: connection.summary,
    recentWorkouts: connection.workouts.slice(0, 25),
  });
});

app.post('/api/integrations/apple-health/disconnect', (req, res) => {
  const { connectionId } = req.body;
  if (connectionId) {
    integrationStore.appleHealthConnections.delete(connectionId);
  }

  res.json({
    status: 'success',
    connected: false,
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);

  const response = {
    status: 'error',
    message: NODE_ENV === 'production' ? 'Internal server error' : err.message,
  };

  if (NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(err.status || 500).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
