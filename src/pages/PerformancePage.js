import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Tabs,
  Tab,
  Divider,
  LinearProgress,
  MenuItem,
  FormControl,
  Select,
  Button,
  styled,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// Placeholder for chart components 
// In a real implementation, you'd import chart libraries like Chart.js or Recharts
const LineChart = ({ data, height = 200 }) => (
  <Box 
    sx={{ 
      height, 
      bgcolor: 'rgba(255, 107, 149, 0.05)', 
      borderRadius: 2, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Typography variant="body2" color="text.secondary">
      [Line Chart Visualization for {data}]
    </Typography>
  </Box>
);

const BarChart = ({ data, height = 200 }) => (
  <Box 
    sx={{ 
      height, 
      bgcolor: 'rgba(255, 107, 149, 0.05)', 
      borderRadius: 2, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Typography variant="body2" color="text.secondary">
      [Bar Chart Visualization for {data}]
    </Typography>
  </Box>
);

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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const MetricProgress = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
}));

const ProgressIndicator = styled(Box)(({ theme, positive }) => ({
  display: 'flex',
  alignItems: 'center',
  color: positive ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 600,
  fontSize: '0.875rem',
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const TabsContainer = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: 1.5,
  },
}));

// Sample data
const performanceMetrics = [
  {
    label: "Weekly Distance",
    value: "43.2",
    unit: "km",
    change: "+12%",
    positive: true,
    icon: <DirectionsRunIcon />,
  },
  {
    label: "Average Pace",
    value: "5:24",
    unit: "min/km",
    change: "-8%",
    positive: true,
    icon: <SpeedIcon />,
  },
  {
    label: "VO2 Max",
    value: "48.3",
    unit: "ml/kg/min",
    change: "+3%",
    positive: true,
    icon: <MonitorHeartIcon />,
  },
  {
    label: "Training Load",
    value: "675",
    unit: "points",
    change: "+5%",
    positive: true,
    icon: <FitnessCenterIcon />,
  },
];

const weeklyGoals = [
  {
    label: "Distance Goal",
    current: 43.2,
    target: 50,
    unit: "km",
  },
  {
    label: "Running Frequency",
    current: 4,
    target: 5,
    unit: "days",
  },
  {
    label: "Long Run",
    current: 12,
    target: 16,
    unit: "km",
  },
  {
    label: "Strength Workouts",
    current: 2,
    target: 3,
    unit: "sessions",
  }
];

function PerformancePage() {
  const [timeRange, setTimeRange] = useState('4weeks');
  const [metricTab, setMetricTab] = useState(0);
  
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  
  const handleMetricTabChange = (event, newValue) => {
    setMetricTab(newValue);
  };

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Performance <span>Analytics</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Track your progress, analyze performance metrics, and gain insights to improve your running
        </PageSubtitle>
      </PageHeader>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>
          Performance Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DateRangeIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              displayEmpty
            >
              <MenuItem value="7days">Last 7 days</MenuItem>
              <MenuItem value="4weeks">Last 4 weeks</MenuItem>
              <MenuItem value="3months">Last 3 months</MenuItem>
              <MenuItem value="1year">Last year</MenuItem>
            </Select>
          </FormControl>
          <Button 
            startIcon={<CloudDownloadIcon />} 
            sx={{ ml: 2 }}
            size="small"
          >
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {performanceMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard elevation={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <MetricLabel variant="subtitle1">{metric.label}</MetricLabel>
                <Box sx={{ color: 'primary.main' }}>
                  {metric.icon}
                </Box>
              </Box>
              <MetricValue>
                {metric.value}
                <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 0.5, fontWeight: 400 }}>
                  {metric.unit}
                </Typography>
              </MetricValue>
              <MetricProgress>
                <ProgressIndicator positive={metric.positive}>
                  {metric.change}
                </ProgressIndicator>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs previous {timeRange === '7days' ? 'week' : 
                              timeRange === '4weeks' ? 'month' : 
                              timeRange === '3months' ? 'quarter' : 'year'}
                </Typography>
              </MetricProgress>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      <ChartContainer elevation={1}>
        <ChartHeader>
          <Typography variant="h6" fontWeight={700}>
            Training Progress
          </Typography>
          <TabsContainer 
            value={metricTab} 
            onChange={handleMetricTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Distance" icon={<DirectionsRunIcon />} iconPosition="start" />
            <Tab label="Pace" icon={<SpeedIcon />} iconPosition="start" />
            <Tab label="Heart Rate" icon={<MonitorHeartIcon />} iconPosition="start" />
            <Tab label="Training Load" icon={<FitnessCenterIcon />} iconPosition="start" />
          </TabsContainer>
        </ChartHeader>
        
        {metricTab === 0 && <LineChart data="Weekly Distance" height={300} />}
        {metricTab === 1 && <LineChart data="Average Pace" height={300} />}
        {metricTab === 2 && <LineChart data="Heart Rate Zones" height={300} />}
        {metricTab === 3 && <LineChart data="Training Load" height={300} />}
      </ChartContainer>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Weekly Goals
          </Typography>
          <StyledCard>
            <CardContent>
              {weeklyGoals.map((goal, index) => (
                <Box key={index} sx={{ mb: index < weeklyGoals.length - 1 ? 3 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {goal.label}
                    </Typography>
                    <Typography variant="body2">
                      {goal.current} / {goal.target} {goal.unit}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(goal.current / goal.target) * 100} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      mb: 1,
                      bgcolor: 'rgba(255, 107, 149, 0.1)',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {Math.round((goal.current / goal.target) * 100)}% of weekly goal
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Activity Distribution
          </Typography>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Training Types
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 4 weeks
                </Typography>
              </Box>
              <BarChart data="Training Types" height={220} />
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Training Intensity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By heart rate zones
                </Typography>
              </Box>
              <BarChart data="Heart Rate Zones" height={220} />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 3 }}>
        Recent Activities
      </Typography>
      <Grid container spacing={3}>
        {[1, 2, 3].map((activity) => (
          <Grid item xs={12} md={4} key={activity}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {activity === 1 ? "Morning Run" : 
                     activity === 2 ? "Interval Training" : "Long Run"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity === 1 ? "Today" : 
                     activity === 2 ? "Yesterday" : "3 days ago"}
                  </Typography>
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <DirectionsRunIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Distance
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {activity === 1 ? "5.4 km" : 
                         activity === 2 ? "8.2 km" : "16.0 km"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AccessTimeIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Time
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {activity === 1 ? "28:12" : 
                         activity === 2 ? "42:45" : "1:47:32"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SpeedIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Pace
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {activity === 1 ? "5:13/km" : 
                         activity === 2 ? "5:27/km" : "6:42/km"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ height: 100, bgcolor: 'rgba(255, 107, 149, 0.05)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    [Activity Map Preview]
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    <TrendingUpIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {activity === 1 ? "42m elevation" : 
                     activity === 2 ? "110m elevation" : "320m elevation"}
                  </Typography>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PerformancePage; 