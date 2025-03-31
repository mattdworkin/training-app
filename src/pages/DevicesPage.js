import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Avatar,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
  styled,
} from '@mui/material';
import WatchIcon from '@mui/icons-material/Watch';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WifiIcon from '@mui/icons-material/Wifi';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

// Styled components
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
    width: 100,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '& span': {
    color: theme.palette.primary.main,
  },
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const DeviceCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const ConnectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 600,
}));

const DisconnectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.grey[800],
  fontWeight: 600,
}));

const DeviceIconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 107, 149, 0.1)',
  marginRight: theme.spacing(2),
  width: 56,
  height: 56,
  '& svg': {
    color: theme.palette.primary.main,
    fontSize: '1.8rem',
  },
}));

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 107, 149, 0.1)',
  marginRight: theme.spacing(2),
  width: 40,
  height: 40,
  '& svg': {
    color: theme.palette.primary.main,
    fontSize: '1.3rem',
  },
}));

// Placeholder data
const connectedDevices = [
  {
    id: 1,
    name: "Garmin Forerunner 245",
    type: "Watch",
    icon: <WatchIcon />,
    connected: true,
    batteryLevel: 78,
    lastSync: "Today, 8:45 AM",
  },
  {
    id: 2,
    name: "Polar H10 Heart Rate Monitor",
    type: "Heart Rate Monitor",
    icon: <MonitorHeartIcon />,
    connected: true,
    batteryLevel: 65,
    lastSync: "Yesterday, 6:30 PM",
  },
  {
    id: 3,
    name: "Stryd Running Power Meter",
    type: "Footpod",
    icon: <DirectionsRunIcon />,
    connected: false,
    batteryLevel: 92,
    lastSync: "Last week",
  },
];

const compatibleApps = [
  {
    name: "Strava",
    icon: "/images/strava-icon.png",
    connected: true,
  },
  {
    name: "Nike Run Club",
    icon: "/images/nike-icon.png",
    connected: false,
  },
  {
    name: "Garmin Connect",
    icon: "/images/garmin-icon.png",
    connected: true,
  },
  {
    name: "MapMyRun",
    icon: "/images/mapmyrun-icon.png",
    connected: false,
  },
];

const dataMetrics = [
  {
    name: "Steps",
    icon: <DirectionsRunIcon />,
    synced: true,
  },
  {
    name: "Distance",
    icon: <DirectionsRunIcon />,
    synced: true,
  },
  {
    name: "Heart Rate",
    icon: <MonitorHeartIcon />,
    synced: true,
  },
  {
    name: "Calories",
    icon: <FitnessCenterIcon />,
    synced: true,
  },
  {
    name: "Sleep Data",
    icon: <WatchIcon />,
    synced: false,
  },
  {
    name: "Power Output",
    icon: <FitnessCenterIcon />,
    synced: true,
  },
];

function DevicesPage() {
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 10, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Device <span>Integration</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Connect your wearable devices, sync your data, and gain valuable insights from your training
        </PageSubtitle>
      </PageHeader>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item>
          <Typography variant="h5" fontWeight={700}>
            Connected Devices
          </Typography>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          {isSyncing && (
            <Box sx={{ width: '100%', ml: 2 }}>
              <LinearProgress variant="determinate" value={syncProgress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
          )}
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SyncIcon />}
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? `Syncing ${syncProgress}%` : "Sync Now"}
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<AddIcon />}
          >
            Add Device
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {connectedDevices.map((device) => (
          <Grid item xs={12} md={4} key={device.id}>
            <DeviceCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DeviceIconWrapper>
                    {device.icon}
                  </DeviceIconWrapper>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {device.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {device.type}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2">Status</Typography>
                  {device.connected ? (
                    <ConnectedChip 
                      icon={<BluetoothIcon />} 
                      label="Connected" 
                      size="small" 
                    />
                  ) : (
                    <DisconnectedChip 
                      label="Disconnected" 
                      size="small" 
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2">Battery</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={device.batteryLevel} 
                      sx={{ 
                        width: 60, 
                        mr: 1, 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: device.batteryLevel > 20 ? '#4caf50' : '#f44336',
                        }
                      }} 
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {device.batteryLevel}%
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">Last Sync</Typography>
                  <Typography variant="body2">{device.lastSync}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    size="small" 
                    startIcon={<SettingsIcon />}
                  >
                    Settings
                  </Button>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </DeviceCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Data Integration
          </Typography>
          <FeatureBox elevation={1}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Active Metrics Syncing
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Control which metrics are synced from your devices to your running profile.
            </Typography>
            
            <List>
              {dataMetrics.map((metric, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'rgba(255, 107, 149, 0.1)' }}>
                        {metric.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={metric.name} 
                    />
                    <ListItemSecondaryAction>
                      <Switch 
                        edge="end"
                        checked={metric.synced}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < dataMetrics.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="contained" color="primary">
                Save Preferences
              </Button>
            </Box>
          </FeatureBox>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            App Connections
          </Typography>
          <FeatureBox elevation={1}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Connected Apps
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connect to other fitness apps to sync your data and enhance your training.
            </Typography>
            
            <List>
              {compatibleApps.map((app, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar 
                        src={app.icon} 
                        sx={{ bgcolor: 'transparent' }}
                      >
                        <SportsSoccerIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={app.name} 
                      secondary={app.connected ? "Connected" : "Not connected"}
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        variant={app.connected ? "outlined" : "contained"} 
                        color="primary"
                        size="small"
                        startIcon={app.connected ? <CheckCircleIcon /> : <LinkIcon />}
                      >
                        {app.connected ? "Connected" : "Connect"}
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < compatibleApps.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </FeatureBox>
          
          <Typography variant="h5" fontWeight={700} sx={{ mt: 4 }} gutterBottom>
            Smart Features
          </Typography>
          <FeatureBox elevation={1}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Device-enabled features to enhance your training
            </Typography>
            
            <FeatureItem>
              <FeatureIcon>
                <MonitorHeartIcon />
              </FeatureIcon>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Real-time Heart Rate Training
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get live guidance based on your heart rate zones
                </Typography>
              </Box>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>
                <WifiIcon />
              </FeatureIcon>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Workout Auto-Detection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your device automatically logs runs without manual tracking
                </Typography>
              </Box>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>
                <PhoneAndroidIcon />
              </FeatureIcon>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Smart Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive pace, distance and coaching alerts during your run
                </Typography>
              </Box>
            </FeatureItem>
          </FeatureBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DevicesPage; 