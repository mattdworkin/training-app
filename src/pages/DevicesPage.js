import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip,
  Paper,
  Alert,
  LinearProgress,
  Snackbar,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncIcon from '@mui/icons-material/Sync';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AppleIcon from '@mui/icons-material/Apple';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelineIcon from '@mui/icons-material/Timeline';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { DataService } from '../utils/DataService';

const STRAVA_CONNECTION_KEY = 'trainingfox_strava_connection_id';
const STRAVA_STATE_KEY = 'trainingfox_strava_oauth_state';
const APPLE_CONNECTION_KEY = 'trainingfox_apple_connection_id';

const PageHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2, 6),
  marginBottom: theme.spacing(4),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: 4,
    width: 110,
    borderRadius: 2,
    background: 'linear-gradient(90deg, #ff5f7f 0%, #11a4a5 100%)',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  '& span': {
    background: 'linear-gradient(105deg, #ff5f7f 0%, #11a4a5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 850,
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const IntegrationCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  boxShadow: `0 18px 30px ${alpha(theme.palette.secondary.main, 0.1)}`,
  height: '100%',
}));

const IntegrationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ProviderIdentity = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const ProviderAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  fontWeight: 800,
  boxShadow: `0 8px 18px ${alpha(theme.palette.secondary.main, 0.2)}`,
}));

const SummaryGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: theme.spacing(1.2),
  marginTop: theme.spacing(2),
}));

const SummaryItem = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(1.4),
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  backgroundColor: alpha('#ffffff', 0.82),
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.35rem',
  color: theme.palette.secondary.main,
}));

function formatDate(dateIso) {
  if (!dateIso) {
    return 'Never';
  }
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }
  return date.toLocaleString();
}

function parseAppleHealthXml(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid XML file.');
  }

  const workouts = Array.from(doc.getElementsByTagName('Workout'));
  const parsed = workouts
    .filter((workout) => {
      const type = String(workout.getAttribute('workoutActivityType') || '').toLowerCase();
      return type.includes('running');
    })
    .map((workout) => ({
      startDate: workout.getAttribute('startDate'),
      totalDistance: workout.getAttribute('totalDistance'),
      totalDistanceUnit: workout.getAttribute('totalDistanceUnit') || 'km',
      duration: workout.getAttribute('duration'),
      durationUnit: workout.getAttribute('durationUnit') || 'min',
      workoutType: workout.getAttribute('workoutActivityType') || 'Running',
      source: 'Apple Health XML',
    }))
    .filter((workout) => workout.startDate && (workout.totalDistance || workout.duration));

  return parsed;
}

function parseAppleHealthJson(jsonText) {
  const parsed = JSON.parse(jsonText);
  const list = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.workouts)
      ? parsed.workouts
      : Array.isArray(parsed.data)
        ? parsed.data
        : [];

  return list.map((item) => ({
    startDate: item.startDate || item.date || item.workoutDate,
    distanceKm: item.distanceKm,
    distance: item.distance,
    distanceUnit: item.distanceUnit,
    durationMin: item.durationMin,
    duration: item.duration,
    durationUnit: item.durationUnit,
    workoutType: item.workoutType || item.type || 'Running',
    source: item.source || 'Apple Health JSON',
  }));
}

function parseAppleHealthCsv(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    return {
      startDate: row.startdate || row.date || row.workoutdate,
      distanceKm: row.distancekm,
      distance: row.distance,
      distanceUnit: row.distanceunit || 'km',
      durationMin: row.durationmin,
      duration: row.duration,
      durationUnit: row.durationunit || 'min',
      workoutType: row.workouttype || row.type || 'Running',
      source: 'Apple Health CSV',
    };
  });
}

function DevicesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const callbackHandledRef = useRef(false);
  const appleInputRef = useRef(null);

  const [stravaConfig, setStravaConfig] = useState({ configured: false, loading: true });
  const [strava, setStrava] = useState({
    connected: false,
    connectionId: null,
    athlete: null,
    lastSync: null,
    summary: null,
    activities: [],
  });
  const [appleHealth, setAppleHealth] = useState({
    connected: false,
    connectionId: null,
    lastSync: null,
    summary: null,
    recentWorkouts: [],
  });
  const [syncingStrava, setSyncingStrava] = useState(false);
  const [importingApple, setImportingApple] = useState(false);
  const [appleImportProgress, setAppleImportProgress] = useState(0);
  const [lastImportedFile, setLastImportedFile] = useState('');
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });

  const showToast = (severity, message) => {
    setToast({ open: true, severity, message });
  };

  const stravaAthleteName = useMemo(() => {
    if (!strava.athlete) {
      return '';
    }
    const first = strava.athlete.firstname || '';
    const last = strava.athlete.lastname || '';
    return `${first} ${last}`.trim() || strava.athlete.username || 'Strava Athlete';
  }, [strava.athlete]);

  useEffect(() => {
    const init = async () => {
      try {
        const config = await DataService.getStravaConfig();
        setStravaConfig({ configured: Boolean(config.configured), loading: false });
      } catch (error) {
        setStravaConfig({ configured: false, loading: false });
      }

      const storedStravaConnectionId = localStorage.getItem(STRAVA_CONNECTION_KEY);
      if (storedStravaConnectionId) {
        try {
          const status = await DataService.getStravaStatus(storedStravaConnectionId);
          if (status.connected) {
            setStrava({
              connected: true,
              connectionId: storedStravaConnectionId,
              athlete: status.athlete || null,
              lastSync: status.lastSync || null,
              summary: status.lastSummary || null,
              activities: [],
            });
          } else {
            localStorage.removeItem(STRAVA_CONNECTION_KEY);
          }
        } catch (error) {
          localStorage.removeItem(STRAVA_CONNECTION_KEY);
        }
      }

      const storedAppleConnectionId = localStorage.getItem(APPLE_CONNECTION_KEY);
      if (storedAppleConnectionId) {
        try {
          const status = await DataService.getAppleHealthStatus(storedAppleConnectionId);
          if (status.connected) {
            setAppleHealth({
              connected: true,
              connectionId: storedAppleConnectionId,
              lastSync: status.lastSync,
              summary: status.summary,
              recentWorkouts: status.recentWorkouts || [],
            });
          } else {
            localStorage.removeItem(APPLE_CONNECTION_KEY);
          }
        } catch (error) {
          localStorage.removeItem(APPLE_CONNECTION_KEY);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (callbackHandledRef.current) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    const oauthError = params.get('error');

    if (!code && !oauthError) {
      return;
    }

    callbackHandledRef.current = true;

    const handleCallback = async () => {
      try {
        if (oauthError) {
          throw new Error('Strava authorization was cancelled or denied.');
        }

        const expectedState = localStorage.getItem(STRAVA_STATE_KEY);
        if (!expectedState || state !== expectedState) {
          throw new Error('Invalid Strava OAuth state. Please try connecting again.');
        }

        const result = await DataService.exchangeStravaCode({ code, state });
        localStorage.setItem(STRAVA_CONNECTION_KEY, result.connectionId);
        localStorage.removeItem(STRAVA_STATE_KEY);

        setStrava({
          connected: true,
          connectionId: result.connectionId,
          athlete: result.athlete || null,
          lastSync: null,
          summary: null,
          activities: [],
        });

        showToast('success', 'Strava connected successfully.');
      } catch (error) {
        showToast('error', error.message || 'Failed to connect Strava.');
      } finally {
        navigate('/devices', { replace: true });
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  const handleConnectStrava = async () => {
    try {
      const redirectUri = `${window.location.origin}/devices`;
      const result = await DataService.getStravaAuthUrl(redirectUri);
      localStorage.setItem(STRAVA_STATE_KEY, result.state);
      window.location.assign(result.authUrl);
    } catch (error) {
      showToast('error', error.message || 'Could not start Strava connection.');
    }
  };

  const handleSyncStrava = async () => {
    if (!strava.connectionId) {
      return;
    }

    setSyncingStrava(true);
    try {
      const result = await DataService.syncStrava(strava.connectionId, 25);
      setStrava((prev) => ({
        ...prev,
        lastSync: result.summary?.syncedAt || new Date().toISOString(),
        summary: result.summary || null,
        activities: result.activities || [],
      }));
      showToast('success', `Synced ${result.summary?.activityCount || 0} Strava activities.`);
    } catch (error) {
      showToast('error', error.message || 'Failed to sync Strava activities.');
    } finally {
      setSyncingStrava(false);
    }
  };

  const handleDisconnectStrava = async () => {
    if (!strava.connectionId) {
      return;
    }

    try {
      await DataService.disconnectStrava(strava.connectionId);
    } catch (error) {
      // Ignore disconnect errors and clear local state regardless.
    } finally {
      localStorage.removeItem(STRAVA_CONNECTION_KEY);
      localStorage.removeItem(STRAVA_STATE_KEY);
      setStrava({
        connected: false,
        connectionId: null,
        athlete: null,
        lastSync: null,
        summary: null,
        activities: [],
      });
      showToast('success', 'Strava disconnected.');
    }
  };

  const handleImportAppleHealth = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    setImportingApple(true);
    setAppleImportProgress(15);
    setLastImportedFile(file.name);

    try {
      const raw = await file.text();
      setAppleImportProgress(35);

      let workouts = [];
      const lowerName = file.name.toLowerCase();
      if (lowerName.endsWith('.xml')) {
        workouts = parseAppleHealthXml(raw);
      } else if (lowerName.endsWith('.json')) {
        workouts = parseAppleHealthJson(raw);
      } else if (lowerName.endsWith('.csv')) {
        workouts = parseAppleHealthCsv(raw);
      } else {
        throw new Error('Unsupported file type. Use XML, JSON, or CSV.');
      }

      if (!workouts.length) {
        throw new Error('No running workouts found in this file.');
      }

      setAppleImportProgress(65);
      const result = await DataService.importAppleHealth(workouts, appleHealth.connectionId);
      setAppleImportProgress(100);

      localStorage.setItem(APPLE_CONNECTION_KEY, result.connectionId);
      setAppleHealth({
        connected: true,
        connectionId: result.connectionId,
        lastSync: result.lastSync,
        summary: result.summary,
        recentWorkouts: result.recentWorkouts || [],
      });
      showToast('success', `Imported ${result.summary?.workoutCount || 0} Apple Health workouts.`);
    } catch (error) {
      showToast('error', error.message || 'Apple Health import failed.');
    } finally {
      setTimeout(() => {
        setImportingApple(false);
        setAppleImportProgress(0);
      }, 400);
      event.target.value = '';
    }
  };

  const handleDisconnectApple = async () => {
    if (!appleHealth.connectionId) {
      return;
    }

    try {
      await DataService.disconnectAppleHealth(appleHealth.connectionId);
    } catch (error) {
      // Ignore errors and clear client state regardless.
    } finally {
      localStorage.removeItem(APPLE_CONNECTION_KEY);
      setAppleHealth({
        connected: false,
        connectionId: null,
        lastSync: null,
        summary: null,
        recentWorkouts: [],
      });
      showToast('success', 'Apple Health connection removed.');
    }
  };

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Device <span>Integration</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Live integrations for Strava and Apple Health data import are enabled below.
        </PageSubtitle>
      </PageHeader>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 3 }}>
        Apple Health does not provide direct browser OAuth access like Strava. For web, import your Apple Health
        export file (`export.xml`, JSON, or CSV) and we sync it into your profile.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <IntegrationCard>
            <CardContent sx={{ p: 3.2 }}>
              <IntegrationHeader>
                <ProviderIdentity>
                  <ProviderAvatar sx={{ bgcolor: '#fc4c02' }}>S</ProviderAvatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      Strava
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      OAuth connection + recent activity sync
                    </Typography>
                  </Box>
                </ProviderIdentity>
                <Chip
                  icon={strava.connected ? <CheckCircleIcon /> : <InfoOutlinedIcon />}
                  label={strava.connected ? 'Connected' : 'Disconnected'}
                  color={strava.connected ? 'success' : 'default'}
                />
              </IntegrationHeader>

              {!stravaConfig.loading && !stravaConfig.configured && (
                <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
                  Strava is not configured on the server. Add `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` in
                  `server/.env`.
                </Alert>
              )}

              {strava.connected && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Connected athlete
                  </Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" color="primary" />
                    {stravaAthleteName || 'Strava Athlete'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last sync: {formatDate(strava.lastSync)}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', mb: 2 }}>
                {!strava.connected ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LinkIcon />}
                    onClick={handleConnectStrava}
                    disabled={!stravaConfig.configured || stravaConfig.loading}
                  >
                    Connect Strava
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SyncIcon />}
                      onClick={handleSyncStrava}
                      disabled={syncingStrava}
                    >
                      {syncingStrava ? 'Syncing...' : 'Sync Activities'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDisconnectStrava}
                    >
                      Disconnect
                    </Button>
                  </>
                )}
              </Box>

              {syncingStrava && <LinearProgress sx={{ mb: 2, borderRadius: 999, height: 8 }} />}

              {strava.summary && (
                <SummaryGrid>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Activities
                    </Typography>
                    <MetricValue>{strava.summary.activityCount}</MetricValue>
                  </SummaryItem>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Distance
                    </Typography>
                    <MetricValue>{strava.summary.totalDistanceKm} km</MetricValue>
                  </SummaryItem>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Moving Time
                    </Typography>
                    <MetricValue>{strava.summary.totalMovingHours} h</MetricValue>
                  </SummaryItem>
                </SummaryGrid>
              )}

              {strava.activities.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Recent Runs
                  </Typography>
                  <List dense>
                    {strava.activities.slice(0, 6).map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 34 }}>
                            <SportsScoreIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.name}
                            secondary={`${activity.distanceKm} km • ${activity.movingTimeMin} min • ${new Date(
                              activity.startDate
                            ).toLocaleDateString()}`}
                          />
                        </ListItem>
                        {index < Math.min(strava.activities.length, 6) - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </IntegrationCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <IntegrationCard>
            <CardContent sx={{ p: 3.2 }}>
              <IntegrationHeader>
                <ProviderIdentity>
                  <ProviderAvatar sx={{ bgcolor: '#111111' }}>
                    <AppleIcon />
                  </ProviderAvatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      Apple Health
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Import running workouts from Apple Health exports
                    </Typography>
                  </Box>
                </ProviderIdentity>
                <Chip
                  icon={appleHealth.connected ? <CheckCircleIcon /> : <InfoOutlinedIcon />}
                  label={appleHealth.connected ? 'Imported' : 'Not Imported'}
                  color={appleHealth.connected ? 'success' : 'default'}
                />
              </IntegrationHeader>

              <HiddenInput
                id="apple-health-file-input"
                ref={appleInputRef}
                type="file"
                accept=".xml,.json,.csv,text/xml,application/xml,application/json,text/csv"
                onChange={handleImportAppleHealth}
              />

              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => appleInputRef.current && appleInputRef.current.click()}
                  disabled={importingApple}
                >
                  {appleHealth.connected ? 'Import New File' : 'Import Apple Health File'}
                </Button>
                {appleHealth.connected && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDisconnectApple}
                    disabled={importingApple}
                  >
                    Disconnect
                  </Button>
                )}
              </Box>

              {importingApple && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress variant="determinate" value={appleImportProgress} sx={{ borderRadius: 999, height: 8 }} />
                  <Typography variant="caption" color="text.secondary">
                    Processing {lastImportedFile || 'file'}...
                  </Typography>
                </Box>
              )}

              {appleHealth.connected && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Last import: {formatDate(appleHealth.lastSync)}
                </Typography>
              )}

              {appleHealth.summary && (
                <SummaryGrid>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Workouts
                    </Typography>
                    <MetricValue>{appleHealth.summary.workoutCount}</MetricValue>
                  </SummaryItem>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Distance
                    </Typography>
                    <MetricValue>{appleHealth.summary.totalDistanceKm} km</MetricValue>
                  </SummaryItem>
                  <SummaryItem elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Duration
                    </Typography>
                    <MetricValue>{appleHealth.summary.totalDurationHours} h</MetricValue>
                  </SummaryItem>
                </SummaryGrid>
              )}

              {appleHealth.recentWorkouts.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Recent Imported Runs
                  </Typography>
                  <List dense>
                    {appleHealth.recentWorkouts.slice(0, 6).map((workout, index) => (
                      <React.Fragment key={`${workout.startDate}-${index}`}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 34 }}>
                            <DirectionsRunIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${workout.distanceKm || 0} km • ${workout.type || 'Run'}`}
                            secondary={`${new Date(workout.startDate).toLocaleDateString()} • ${
                              workout.durationMin || 0
                            } min`}
                          />
                        </ListItem>
                        {index < Math.min(appleHealth.recentWorkouts.length, 6) - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}

              {!appleHealth.connected && (
                <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                  Export your Apple Health data and import the workout file here. We currently support running workouts.
                </Alert>
              )}
            </CardContent>
          </IntegrationCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.4, borderRadius: 3 }} elevation={0}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              <TimelineIcon sx={{ verticalAlign: 'middle', mr: 0.8 }} />
              Data Quality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Strava sync pulls your latest activities directly via OAuth. Apple Health imports are normalized and
              validated before being stored.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.4, borderRadius: 3 }} elevation={0}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 0.8 }} />
              Sync Speed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A Strava sync typically completes in a few seconds. Apple file imports depend on file size.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.4, borderRadius: 3 }} elevation={0}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              <InfoOutlinedIcon sx={{ verticalAlign: 'middle', mr: 0.8 }} />
              MVP Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connections are stored in-memory on the server for now. If the server restarts, reconnect and re-import.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DevicesPage;
