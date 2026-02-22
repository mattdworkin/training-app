import React, { useMemo, useState } from 'react';
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
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip as ChartTooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ChartTooltip, Legend, Filler);

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
  maxWidth: 800,
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.2,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  boxShadow: `0 16px 28px ${alpha(theme.palette.secondary.main, 0.09)}`,
  transition: 'transform 240ms ease, box-shadow 240ms ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 34px ${alpha(theme.palette.secondary.main, 0.14)}`,
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.2,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    background: 'linear-gradient(180deg, #ff5f7f 0%, #11a4a5 100%)',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  lineHeight: 1.1,
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

const MetricProgress = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
});

const ProgressIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'positive',
})(({ theme, positive }) => ({
  display: 'flex',
  alignItems: 'center',
  color: positive ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 700,
  fontSize: '0.875rem',
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.2,
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2.5),
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

const TabsContainer = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: 999,
  },
}));

const ActivityPreview = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  background: `linear-gradient(130deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.info.main, 0.12)} 100%)`,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  padding: theme.spacing(1.5),
}));

const timeRangeMap = {
  '7days': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    factor: 0.9,
  },
  '4weeks': {
    labels: ['W1', 'W2', 'W3', 'W4'],
    factor: 1,
  },
  '3months': {
    labels: ['Jan', 'Feb', 'Mar'],
    factor: 1.08,
  },
  '1year': {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    factor: 1.16,
  },
};

const performanceMetrics = [
  {
    label: 'Weekly Distance',
    value: 43.2,
    unit: 'km',
    change: '+12%',
    positive: true,
    icon: <DirectionsRunIcon />,
  },
  {
    label: 'Average Pace',
    value: '5:24',
    unit: 'min/km',
    change: '-8%',
    positive: true,
    icon: <SpeedIcon />,
  },
  {
    label: 'VO2 Max',
    value: 48.3,
    unit: 'ml/kg/min',
    change: '+3%',
    positive: true,
    icon: <MonitorHeartIcon />,
  },
  {
    label: 'Training Load',
    value: 675,
    unit: 'pts',
    change: '+5%',
    positive: true,
    icon: <FitnessCenterIcon />,
  },
];

const weeklyGoals = [
  { label: 'Distance Goal', current: 43.2, target: 50, unit: 'km' },
  { label: 'Running Frequency', current: 4, target: 5, unit: 'days' },
  { label: 'Long Run', current: 12, target: 16, unit: 'km' },
  { label: 'Strength Workouts', current: 2, target: 3, unit: 'sessions' },
];

const activityRows = [
  {
    name: 'Morning Run',
    time: 'Today',
    distance: '5.4 km',
    duration: '28:12',
    pace: '5:13/km',
    elevation: '42m elevation',
    map: [21, 26, 32, 29, 34, 42, 39],
  },
  {
    name: 'Interval Training',
    time: 'Yesterday',
    distance: '8.2 km',
    duration: '42:45',
    pace: '5:27/km',
    elevation: '110m elevation',
    map: [17, 22, 28, 35, 27, 31, 25],
  },
  {
    name: 'Long Run',
    time: '3 days ago',
    distance: '16.0 km',
    duration: '1:47:32',
    pace: '6:42/km',
    elevation: '320m elevation',
    map: [13, 16, 22, 30, 38, 33, 28],
  },
];

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  scales: {
    x: {
      grid: {
        color: alpha('#1f2a44', 0.08),
      },
      ticks: {
        color: '#4f5770',
      },
    },
    y: {
      grid: {
        color: alpha('#1f2a44', 0.08),
      },
      ticks: {
        color: '#4f5770',
      },
      beginAtZero: false,
    },
  },
};

function MetricLineChart({ labels, data, label, color }) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        tension: 0.36,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderColor: color,
        backgroundColor: alpha(color, 0.14),
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{ height: 300 }}>
      <Line data={chartData} options={chartBaseOptions} />
    </Box>
  );
}

function DistributionBarChart({ labels, data, label, color }) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderRadius: 8,
        borderSkipped: false,
        backgroundColor: labels.map((_, index) => alpha(color, 0.38 + index * 0.08)),
      },
    ],
  };

  return (
    <Box sx={{ height: 220 }}>
      <Bar
        data={chartData}
        options={{
          ...chartBaseOptions,
          scales: {
            ...chartBaseOptions.scales,
            y: {
              ...chartBaseOptions.scales.y,
              beginAtZero: true,
            },
          },
        }}
      />
    </Box>
  );
}

function SparklinePreview({ values }) {
  const chartData = {
    labels: values.map((_, index) => `${index + 1}`),
    datasets: [
      {
        data: values,
        borderColor: '#ff5f7f',
        backgroundColor: alpha('#ff5f7f', 0.2),
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  return (
    <ActivityPreview>
      <Box sx={{ height: 80 }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: {
              x: { display: false },
              y: { display: false },
            },
            elements: {
              line: { borderWidth: 2.5 },
            },
          }}
        />
      </Box>
    </ActivityPreview>
  );
}

function PerformancePage() {
  const [timeRange, setTimeRange] = useState('4weeks');
  const [metricTab, setMetricTab] = useState(0);

  const chartMeta = useMemo(() => timeRangeMap[timeRange], [timeRange]);

  const metricSeries = useMemo(() => {
    const factor = chartMeta.factor;
    const baseDistance = chartMeta.labels.map((_, index) => Number((35 + index * 2.8 * factor).toFixed(1)));
    const basePace = chartMeta.labels.map((_, index) => Number((5.9 - index * 0.09 * factor).toFixed(2)));
    const baseHr = chartMeta.labels.map((_, index) => Math.round(160 - index * 1.8 * factor));
    const baseLoad = chartMeta.labels.map((_, index) => Math.round(520 + index * 45 * factor));

    return [
      { label: 'Distance (km)', data: baseDistance, color: '#ff5f7f' },
      { label: 'Pace (min/km)', data: basePace, color: '#11a4a5' },
      { label: 'Avg HR (bpm)', data: baseHr, color: '#f5a524' },
      { label: 'Training Load', data: baseLoad, color: '#6f63ff' },
    ];
  }, [chartMeta]);

  const trainingTypeData = useMemo(() => {
    const factor = chartMeta.factor;
    return [6, 3, 2, 1].map((value) => Number((value * factor).toFixed(1)));
  }, [chartMeta.factor]);

  const hrZoneData = useMemo(() => {
    const factor = chartMeta.factor;
    return [24, 32, 21, 15, 8].map((value) => Number((value * factor).toFixed(1)));
  }, [chartMeta.factor]);

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Performance <span>Analytics</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Track your progress, analyze patterns, and turn your training data into confident decisions.
        </PageSubtitle>
      </PageHeader>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h5" fontWeight={800}>
          Performance Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DateRangeIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select value={timeRange} onChange={(event) => setTimeRange(event.target.value)} displayEmpty>
                <MenuItem value="7days">Last 7 days</MenuItem>
                <MenuItem value="4weeks">Last 4 weeks</MenuItem>
                <MenuItem value="3months">Last 3 months</MenuItem>
                <MenuItem value="1year">Last year</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button startIcon={<CloudDownloadIcon />} variant="outlined" color="secondary" size="small">
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {performanceMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <MetricCard elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <MetricLabel variant="subtitle1">{metric.label}</MetricLabel>
                <Box sx={{ color: 'primary.main' }}>{metric.icon}</Box>
              </Box>
              <MetricValue>
                {metric.value}
                <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 0.7, fontWeight: 500 }}>
                  {metric.unit}
                </Typography>
              </MetricValue>
              <MetricProgress>
                <ProgressIndicator positive={metric.positive}>{metric.change}</ProgressIndicator>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs previous {timeRange === '7days' ? 'week' : timeRange === '4weeks' ? 'month' : timeRange === '3months' ? 'quarter' : 'year'}
                </Typography>
              </MetricProgress>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      <ChartContainer elevation={0}>
        <ChartHeader>
          <Typography variant="h6" fontWeight={800}>
            Training Progress
          </Typography>
          <TabsContainer value={metricTab} onChange={(_, newValue) => setMetricTab(newValue)} textColor="primary" indicatorColor="primary">
            <Tab label="Distance" icon={<DirectionsRunIcon />} iconPosition="start" />
            <Tab label="Pace" icon={<SpeedIcon />} iconPosition="start" />
            <Tab label="Heart Rate" icon={<MonitorHeartIcon />} iconPosition="start" />
            <Tab label="Load" icon={<FitnessCenterIcon />} iconPosition="start" />
          </TabsContainer>
        </ChartHeader>
        <MetricLineChart
          labels={chartMeta.labels}
          data={metricSeries[metricTab].data}
          label={metricSeries[metricTab].label}
          color={metricSeries[metricTab].color}
        />
      </ChartContainer>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Weekly Goals
          </Typography>
          <StyledCard>
            <CardContent>
              {weeklyGoals.map((goal, index) => (
                <Box key={goal.label} sx={{ mb: index < weeklyGoals.length - 1 ? 3 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
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
                      bgcolor: alpha('#ff5f7f', 0.12),
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
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Activity Distribution
          </Typography>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.2 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Training Types
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last {timeRange === '7days' ? '7 days' : timeRange === '4weeks' ? '4 weeks' : timeRange === '3months' ? '3 months' : 'year'}
                </Typography>
              </Box>
              <DistributionBarChart
                labels={['Easy', 'Tempo', 'Intervals', 'Long']}
                data={trainingTypeData}
                label="Training Types"
                color="#ff5f7f"
              />
              <Divider sx={{ my: 2.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.2 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Heart Rate Zones
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Relative distribution
                </Typography>
              </Box>
              <DistributionBarChart labels={['Z1', 'Z2', 'Z3', 'Z4', 'Z5']} data={hrZoneData} label="HR Zones" color="#11a4a5" />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight={800} sx={{ mt: 4, mb: 3 }}>
        Recent Activities
      </Typography>
      <Grid container spacing={3}>
        {activityRows.map((activity) => (
          <Grid item xs={12} md={4} key={activity.name}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={800}>
                    {activity.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <DirectionsRunIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Distance
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {activity.distance}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AccessTimeIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Time
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {activity.duration}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SpeedIcon color="primary" />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Pace
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {activity.pace}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <SparklinePreview values={activity.map} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <TrendingUpIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {activity.elevation}
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
