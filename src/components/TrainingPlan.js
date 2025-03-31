import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  styled, 
  Chip,
  Fade,
  Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkoutCard from './WorkoutCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Styled components
const PlanContainer = styled(Box)({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 16px'
});

const SummaryPaper = styled(Paper)(({ theme, color }) => ({
  padding: '24px',
  borderRadius: '20px',
  marginBottom: '32px',
  background: color || '#FFF9FB',
  boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
  textAlign: 'center',
  border: '2px dashed #FFC6D9'
}));

const SummaryTitle = styled(Typography)({
  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  fontWeight: 'bold',
  color: '#6D214F',
  marginBottom: '16px'
});

const FitnessLevelChip = styled(Chip)(({ bgcolor, textcolor }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '24px 16px',
  height: 'auto',
  marginBottom: '16px',
  background: bgcolor || '#FFC6D9',
  color: textcolor || '#6D214F',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: '0 12px'
  }
}));

const StatGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '16px',
  marginTop: '24px',
  marginBottom: '24px'
});

const StatBox = styled(Box)(({ color }) => ({
  padding: '16px',
  borderRadius: '12px',
  background: color || 'rgba(255, 198, 217, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StatValue = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.8rem',
  color: '#6D214F'
});

const StatLabel = styled(Typography)({
  fontSize: '0.8rem',
  color: '#6D214F',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
});

const ChartContainer = styled(Box)({
  width: '200px',
  height: '200px',
  margin: '0 auto 24px auto'
});

const WorkoutsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
  marginTop: '24px'
});

const ResetButton = styled(Button)({
  background: 'linear-gradient(45deg, #FFC6D9 30%, #FFD6E6 90%)',
  borderRadius: '999px',
  border: 0,
  color: '#6D214F',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  marginTop: '24px',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #FFB8E6 30%, #FFC6D9 90%)',
  }
});

const TrainingPlan = ({ trainingData, fitnessLevel, weeklyMileage, onReset }) => {
  // Calculate total stats
  const totalDistance = trainingData.reduce((sum, workout) => sum + workout.distance, 0);
  const totalDuration = trainingData.reduce((sum, workout) => sum + workout.duration, 0);
  const activeWorkouts = trainingData.filter(workout => workout.distance > 0);
  const restDays = trainingData.filter(workout => workout.distance === 0);
  
  // Prepare chart data
  const workoutTypes = {};
  activeWorkouts.forEach(workout => {
    if (!workoutTypes[workout.workoutType]) {
      workoutTypes[workout.workoutType] = 0;
    }
    workoutTypes[workout.workoutType] += workout.distance;
  });
  
  const chartData = {
    labels: Object.keys(workoutTypes),
    datasets: [
      {
        data: Object.values(workoutTypes),
        backgroundColor: [
          '#FF93C9', // Pink
          '#A2D2FF', // Blue
          '#C8FFB0', // Green
          '#FFCCF9', // Light pink
          '#B5DEFF', // Light blue
          '#AEFFA5', // Light green
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Comic Sans MS',
            size: 12
          },
          color: '#6D214F',
          padding: 20
        }
      }
    },
    cutout: '40%'
  };

  return (
    <Fade in={true} timeout={800}>
      <PlanContainer>
        <SummaryPaper>
          <SummaryTitle variant="h5">
            <span role="img" aria-label="trophy">🏆</span> Your Personal Training Plan <span role="img" aria-label="trophy">🏆</span>
          </SummaryTitle>
          
          <FitnessLevelChip 
            label={`${fitnessLevel} Runner`} 
            bgcolor="#FF93C9"
            textcolor="white"
          />
          
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
              <StatLabel>Rest Days</StatLabel>
            </StatBox>
          </StatGrid>
          
          <Typography variant="body1" sx={{ marginBottom: '24px', color: '#6D214F' }}>
            <span role="img" aria-label="sparkles">✨</span> This cute plan is designed for your {fitnessLevel.toLowerCase()} fitness level!
          </Typography>
          
          <ChartContainer>
            <Pie data={chartData} options={chartOptions} />
          </ChartContainer>
        </SummaryPaper>
        
        <Typography variant="h6" sx={{ 
          marginBottom: '16px', 
          fontWeight: 'bold',
          color: '#6D214F',
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive' 
        }}>
          <span role="img" aria-label="calendar">📅</span> Your 7-Day Schedule
        </Typography>
        
        <WorkoutsContainer>
          {trainingData.map((workout, index) => (
            <WorkoutCard 
              key={index} 
              workout={workout} 
              fitnessLevel={fitnessLevel} 
            />
          ))}
        </WorkoutsContainer>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ResetButton 
            onClick={onReset}
            startIcon={<RefreshIcon />}
          >
            Create a New Plan
          </ResetButton>
        </Box>
      </PlanContainer>
    </Fade>
  );
};

export default TrainingPlan; 