import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import TrainingCalculator from '../utils/TrainingCalculator';

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'cardcolor',
})(({ cardcolor }) => ({
  borderRadius: 20,
  background: `linear-gradient(140deg, ${alpha(cardcolor || '#ff8aa0', 0.18)} 0%, ${alpha('#ffffff', 0.95)} 70%)`,
  overflow: 'hidden',
  border: `1px solid ${alpha(cardcolor || '#ff8aa0', 0.25)}`,
  transition: 'transform 220ms ease, box-shadow 220ms ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 28px ${alpha('#1f2a44', 0.16)}`,
  },
}));

const CardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'headercolor',
})(({ headercolor }) => ({
  background: `linear-gradient(135deg, ${headercolor || '#ff8aa0'} 0%, ${alpha(headercolor || '#ff8aa0', 0.72)} 100%)`,
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#fff',
}));

const DateBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha('#ffffff', 0.88),
  color: theme.palette.secondary.main,
  height: 26,
  fontWeight: 700,
  '& .MuiChip-label': {
    paddingInline: 10,
  },
}));

const WorkoutTitle = styled(Typography)({
  fontWeight: 800,
  fontSize: '1rem',
  textShadow: '0 2px 5px rgba(0,0,0,0.15)',
});

const WorkoutStats = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 10,
});

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1.3, 1),
  borderRadius: 12,
  backgroundColor: alpha('#ffffff', 0.75),
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.09)}`,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.68rem',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: 700,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1rem',
  color: theme.palette.secondary.main,
  marginTop: 2,
}));

const WorkoutCard = ({ workout, fitnessLevel }) => {
  const levelTheme = TrainingCalculator.getFitnessLevelTheme(fitnessLevel);
  const emoji = TrainingCalculator.getWorkoutEmoji(workout.workoutType);
  const isRestDay = workout.distance === 0;

  return (
    <StyledCard cardcolor={levelTheme.secondary}>
      <CardHeader headercolor={levelTheme.primary}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Typography component="span" sx={{ fontSize: '1.6rem' }}>
            {emoji}
          </Typography>
          <WorkoutTitle variant="h6">{workout.workoutType}</WorkoutTitle>
        </Box>
        <DateBadge label={workout.formattedDate} size="small" />
      </CardHeader>
      <CardContent sx={{ p: 2 }}>
        <WorkoutStats>
          <StatItem>
            <StatLabel variant="caption">Distance</StatLabel>
            <StatValue variant="body1">{isRestDay ? 'Rest Day' : `${workout.distance} mi`}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel variant="caption">Duration</StatLabel>
            <StatValue variant="body1">{workout.duration > 0 ? `${workout.duration} min` : '-'}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel variant="caption">Pace</StatLabel>
            <StatValue variant="body1">{TrainingCalculator.formatPace(workout.pace)}</StatValue>
          </StatItem>
        </WorkoutStats>
      </CardContent>
    </StyledCard>
  );
};

export default WorkoutCard;
