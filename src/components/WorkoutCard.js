import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  styled
} from '@mui/material';
import TrainingCalculator from '../utils/TrainingCalculator';

// Styled components
const StyledCard = styled(Card)(({ color }) => ({
  marginBottom: '16px',
  borderRadius: '16px',
  background: color || '#FFF9FB',
  overflow: 'visible',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 16px rgba(0,0,0,0.1)',
  }
}));

const CardHeader = styled(Box)(({ color }) => ({
  background: color || '#FFC6D9',
  borderRadius: '16px 16px 0 0',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const DateBadge = styled(Box)({
  background: 'white',
  borderRadius: '12px',
  padding: '4px 10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontSize: '0.85rem',
  fontWeight: 'bold'
});

const EmojiContainer = styled(Box)({
  fontSize: '2rem',
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const WorkoutTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: '#fff', 
  textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
});

const WorkoutStats = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '8px'
});

const StatItem = styled(Box)({
  textAlign: 'center',
  padding: '8px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.7)',
  minWidth: '80px'
});

const StatLabel = styled(Typography)({
  fontSize: '0.7rem',
  color: '#6D214F',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
});

const StatValue = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#6D214F'
});

const WorkoutCard = ({ workout, fitnessLevel }) => {
  const theme = TrainingCalculator.getFitnessLevelTheme(fitnessLevel);
  const emoji = TrainingCalculator.getWorkoutEmoji(workout.workoutType);

  return (
    <StyledCard color={theme.secondary}>
      <CardHeader color={theme.primary}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmojiContainer>{emoji}</EmojiContainer>
          <WorkoutTitle variant="h6">{workout.workoutType}</WorkoutTitle>
        </Box>
        <DateBadge>{workout.formattedDate}</DateBadge>
      </CardHeader>
      <CardContent>
        <WorkoutStats>
          <StatItem>
            <StatLabel variant="caption">Distance</StatLabel>
            <StatValue variant="body1">
              {workout.distance > 0 ? `${workout.distance} mi` : 'Rest Day'}
            </StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel variant="caption">Duration</StatLabel>
            <StatValue variant="body1">
              {workout.duration > 0 ? `${workout.duration} min` : '-'}
            </StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel variant="caption">Pace</StatLabel>
            <StatValue variant="body1">
              {TrainingCalculator.formatPace(workout.pace)}
            </StatValue>
          </StatItem>
        </WorkoutStats>
      </CardContent>
    </StyledCard>
  );
};

export default WorkoutCard; 