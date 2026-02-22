import React, { useMemo } from 'react';
import { Box, Typography, Paper, styled, Chip, Fade, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WorkoutCard from './WorkoutCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PlanContainer = styled(Box)({
  maxWidth: 980,
  margin: '0 auto',
});

const SummaryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 28,
  marginBottom: theme.spacing(4),
  background: `linear-gradient(140deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.info.main, 0.08)} 60%, ${alpha('#ffffff', 0.92)} 100%)`,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.12)}`,
  boxShadow: `0 22px 34px ${alpha(theme.palette.secondary.main, 0.12)}`,
}));

const SummaryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
}));

const FitnessLevelChip = styled(Chip)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '0.98rem',
  paddingInline: theme.spacing(1.4),
  height: 38,
  marginBottom: theme.spacing(2.2),
  background: 'linear-gradient(100deg, #ff5f7f 0%, #ff8aa0 100%)',
  color: '#fff',
}));

const StatGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: theme.spacing(1.4),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(2.8),
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  backgroundColor: alpha('#ffffff', 0.72),
  textAlign: 'center',
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.8rem',
  color: theme.palette.secondary.main,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.72rem',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 700,
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  width: 230,
  height: 230,
  margin: `${theme.spacing(2)} auto ${theme.spacing(2)} auto`,
}));

const WorkoutsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ResetButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: 999,
  paddingInline: theme.spacing(3.2),
  fontWeight: 800,
}));

const TrainingPlan = ({ trainingData, fitnessLevel, weeklyMileage, onReset }) => {
  const totalDistance = trainingData.reduce((sum, workout) => sum + workout.distance, 0);
  const totalDuration = trainingData.reduce((sum, workout) => sum + workout.duration, 0);
  const activeWorkouts = trainingData.filter((workout) => workout.distance > 0);
  const restDays = trainingData.filter((workout) => workout.distance === 0);

  const workoutTypes = useMemo(() => {
    const grouped = {};
    activeWorkouts.forEach((workout) => {
      grouped[workout.workoutType] = (grouped[workout.workoutType] || 0) + workout.distance;
    });
    return grouped;
  }, [activeWorkouts]);

  const chartData = {
    labels: Object.keys(workoutTypes),
    datasets: [
      {
        data: Object.values(workoutTypes),
        backgroundColor: ['#ff7d97', '#11a4a5', '#f5a524', '#7c8eff', '#7acb5e', '#f28cb1'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          color: '#4f5770',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            family: '"Nunito Sans", sans-serif',
            size: 11,
            weight: 700,
          },
        },
      },
    },
    cutout: '62%',
  };

  return (
    <Fade in timeout={500}>
      <PlanContainer>
        <SummaryPaper elevation={0}>
          <SummaryTitle variant="h4">Your Personalized Week Plan</SummaryTitle>

          <FitnessLevelChip icon={<AutoAwesomeRoundedIcon />} label={`${fitnessLevel} Runner`} />

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 660, mx: 'auto', mb: 2, textAlign: 'center' }}>
            Built around your current base of {weeklyMileage} miles per week, with smart balance between challenge and recovery.
          </Typography>

          <StatGrid>
            <StatBox>
              <StatValue>{totalDistance.toFixed(1)}</StatValue>
              <StatLabel>Weekly Miles</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{(totalDuration / 60).toFixed(1)}</StatValue>
              <StatLabel>Total Hours</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{activeWorkouts.length}</StatValue>
              <StatLabel>Active Days</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{restDays.length}</StatValue>
              <StatLabel>Recovery Days</StatLabel>
            </StatBox>
          </StatGrid>

          <ChartContainer>
            <Pie data={chartData} options={chartOptions} />
          </ChartContainer>
        </SummaryPaper>

        <Typography variant="h5" sx={{ mb: 1.2 }}>
          7-Day Schedule
        </Typography>
        <Typography color="text.secondary">
          Tap into each day below for distance, duration, and pacing guidance.
        </Typography>

        <WorkoutsContainer>
          {trainingData.map((workout, index) => (
            <WorkoutCard key={`${workout.workoutType}-${index}`} workout={workout} fitnessLevel={fitnessLevel} />
          ))}
        </WorkoutsContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ResetButton onClick={onReset} variant="contained" color="primary" startIcon={<RefreshRoundedIcon />}>
            Create Another Plan
          </ResetButton>
        </Box>
      </PlanContainer>
    </Fade>
  );
};

export default TrainingPlan;
