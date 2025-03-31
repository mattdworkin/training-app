// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Get environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5002;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

const app = express();

// Use Helmet to set security headers
app.use(helmet());

// Configure Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"]
    }
  })
);

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  }
});

// Apply rate limiting to all requests
app.use(limiter);

// Configure allowed origins
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:3000',
  process.env.PRODUCTION_URL
].filter(Boolean); // Filter out undefined values

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS with options
app.use(cors(corsOptions));
app.use(express.json());

// Parse CSV data once at startup
const trainingSchedules = [];
const csvFilePath = path.join(__dirname, 'data', 'training_schedules.csv');

// Check if the file exists before trying to read it
if (!fs.existsSync(csvFilePath)) {
  console.error('Error: training_schedules.csv file not found');
  process.exit(1);
}

// Use try-catch to handle file reading errors
try {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Validate data before adding it to the array
      if (data && data.day_of_week && data.workout_type) {
        trainingSchedules.push(data);
      } else {
        console.warn('Skipping invalid CSV record:', data);
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

// API endpoint to get training schedules
app.get('/api/training-schedules', (req, res, next) => {
  try {
    if (!trainingSchedules || trainingSchedules.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No training schedules available'
      });
    }
    
    res.json(trainingSchedules);
  } catch (error) {
    next(error);
  }
});

// Helper function to validate request body
function validatePlanRequest(body) {
  const { age, weight, gender, weeklyMileage } = body;
  
  // Check if required fields exist
  if (age === undefined || weight === undefined || gender === undefined || weeklyMileage === undefined) {
    return { valid: false, message: 'Missing required fields' };
  }
  
  // Validate age
  if (typeof age !== 'number' || age < 13 || age > 100) {
    return { valid: false, message: 'Age must be a number between 13 and 100' };
  }
  
  // Validate weight
  if (typeof weight !== 'number' || weight < 30 || weight > 200) {
    return { valid: false, message: 'Weight must be a number between 30 and 200' };
  }
  
  // Validate gender
  if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
    return { valid: false, message: 'Gender must be male, female, or other' };
  }
  
  // Validate weekly mileage
  if (typeof weeklyMileage !== 'number' || weeklyMileage < 0 || weeklyMileage > 50) {
    return { valid: false, message: 'Weekly mileage must be a number between 0 and 50' };
  }
  
  return { valid: true };
}

// API endpoint to generate a training plan
app.post('/api/generate-plan', (req, res, next) => {
  try {
    // Validate request body
    const validation = validatePlanRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({ 
        status: 'error',
        message: validation.message 
      });
    }
    
    const { age, weight, gender, weeklyMileage } = req.body;
    
    // Calculate target weekly mileage
    let targetMileage = weeklyMileage;
    const ageFactor = age > 40 ? 0.95 - ((age - 40) * 0.01) : 1.0;
    const weightFactor = weight > 80 ? 0.95 - ((weight - 80) * 0.005) : 1.0;
    const genderFactor = gender.toLowerCase() === 'female' ? 0.9 : 1.0;
    
    targetMileage = weeklyMileage * ageFactor * weightFactor * genderFactor;
    const maxIncrease = weeklyMileage * 1.1;
    targetMileage = Math.min(targetMileage, maxIncrease);
    targetMileage = Math.round(targetMileage);
    
    // Determine fitness level
    let fitnessLevel;
    if (targetMileage <= 10) {
      fitnessLevel = 'Beginner';
    } else if (targetMileage <= 25) {
      fitnessLevel = 'Intermediate';
    } else {
      fitnessLevel = 'Advanced';
    }
    
    // Filter schedules by fitness level
    const filteredSchedules = trainingSchedules.filter(
      schedule => schedule.level_of_fitness === fitnessLevel
    );
    
    if (filteredSchedules.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No workout schedules found for fitness level: ${fitnessLevel}`
      });
    }
    
    // Sort by day of week
    filteredSchedules.sort((a, b) => 
      parseInt(a.day_of_week, 10) - parseInt(b.day_of_week, 10)
    );
    
    // Create 7-day schedule starting from today
    const startDate = new Date();
    const schedule = [];
    
    for (let i = 0; i < 7; i++) {
      const dayOfWeek = ((startDate.getDay() + i) % 7) + 1; // 1-7 where 1 is Monday
      
      // Find matching workout for this day
      const workout = filteredSchedules.find(s => 
        parseInt(s.day_of_week, 10) === dayOfWeek
      ) || filteredSchedules[0]; // Fallback to first workout if no match
      
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
          day: 'numeric' 
        })
      });
    }
    
    // Send back the results
    res.json({
      status: 'success',
      fitnessLevel,
      targetWeeklyMileage: targetMileage,
      trainingPlan: schedule
    });
  } catch (error) {
    next(error);
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

// Create global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't expose error details in production
  const response = {
    status: 'error',
    message: NODE_ENV === 'production' ? 'Internal server error' : err.message
  };
  
  if (NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  
  res.status(err.status || 500).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 