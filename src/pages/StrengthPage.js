import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import TimerIcon from '@mui/icons-material/Timer';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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

const ExerciseCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const ExerciseImage = styled(Box)(({ theme }) => ({
  height: 160,
  backgroundColor: 'rgba(255, 107, 149, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ExerciseChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontWeight: 600,
}));

const WorkoutContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
}));

// Sample data
const exerciseCategories = [
  {
    title: "Core Exercises",
    icon: <AccessibilityNewIcon />,
    description: "Core exercises to improve stability and protect your spine while running.",
    exercises: [
      {
        name: "Plank",
        muscle: "Core",
        difficulty: "Beginner",
        instructions: "Hold a push-up position with your weight on your forearms. Keep your body in a straight line.",
        sets: "3 sets",
        duration: "30-60 seconds",
      },
      {
        name: "Russian Twists",
        muscle: "Obliques",
        difficulty: "Intermediate",
        instructions: "Sit with your legs bent and feet off the ground. Twist your torso from side to side.",
        sets: "3 sets",
        reps: "15-20 each side",
      },
      {
        name: "Dead Bug",
        muscle: "Core",
        difficulty: "Beginner",
        instructions: "Lie on your back, extend one arm and the opposite leg while keeping your core engaged.",
        sets: "3 sets",
        reps: "10-12 each side",
      },
    ],
  },
  {
    title: "Lower Body Exercises",
    icon: <DirectionsRunIcon />,
    description: "Lower body strength exercises to improve power, stability, and resistance to fatigue.",
    exercises: [
      {
        name: "Squat",
        muscle: "Quadriceps, Glutes",
        difficulty: "Beginner",
        instructions: "Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then rise.",
        sets: "3-4 sets",
        reps: "10-15",
      },
      {
        name: "Lunges",
        muscle: "Quadriceps, Hamstrings, Glutes",
        difficulty: "Beginner",
        instructions: "Step forward into a lunge position, lower your back knee toward the floor, then push back up.",
        sets: "3 sets",
        reps: "10-12 each leg",
      },
      {
        name: "Calf Raises",
        muscle: "Calves",
        difficulty: "Beginner",
        instructions: "Stand on the edge of a step, raise your heels up as high as possible, then lower them below the step.",
        sets: "3 sets",
        reps: "15-20",
      },
    ],
  },
  {
    title: "Hip & Glute Exercises",
    icon: <SportsKabaddiIcon />,
    description: "Hip and glute exercises to improve running form, prevent injuries, and increase power output.",
    exercises: [
      {
        name: "Glute Bridge",
        muscle: "Glutes, Lower Back",
        difficulty: "Beginner",
        instructions: "Lie on your back with knees bent, lift your hips toward the ceiling, squeeze glutes at the top.",
        sets: "3 sets",
        reps: "15-20",
      },
      {
        name: "Clamshells",
        muscle: "Hip Abductors",
        difficulty: "Beginner",
        instructions: "Lie on your side with knees bent, keep feet together, open knees like a clamshell while keeping pelvis stable.",
        sets: "3 sets",
        reps: "15-20 each side",
      },
      {
        name: "Fire Hydrants",
        muscle: "Glutes, Hip Abductors",
        difficulty: "Beginner",
        instructions: "Start on hands and knees, lift one leg out to the side while keeping your knee bent at 90 degrees.",
        sets: "3 sets",
        reps: "12-15 each side",
      },
    ],
  },
];

const workoutPlans = [
  {
    title: "Runner's Strength Circuit - Beginner",
    time: "20-30 minutes",
    description: "A full-body circuit designed for beginners to improve running efficiency and prevent injuries.",
    exercises: [
      "Bodyweight Squats - 3 sets of 12",
      "Push-Ups (or Modified Push-Ups) - 3 sets of 8-10",
      "Glute Bridges - 3 sets of 15",
      "Plank - 3 sets of 30 seconds",
      "Lunges - 2 sets of 10 each leg",
      "Bird Dogs - 2 sets of 10 each side",
    ],
  },
  {
    title: "Runner's Power Workout - Intermediate",
    time: "30-45 minutes",
    description: "A strength workout focused on building power in the legs and core for faster, more efficient running.",
    exercises: [
      "Jump Squats - 4 sets of 12",
      "Walking Lunges - 3 sets of 24 steps",
      "Single-Leg Deadlifts - 3 sets of 10 each leg",
      "Medicine Ball Slams - 3 sets of 15",
      "Russian Twists - 3 sets of 20 (total)",
      "Box Jumps - 3 sets of 10",
      "Plank with Shoulder Taps - 3 sets of 40 seconds",
    ],
  },
  {
    title: "Pre-Run Activation Routine",
    time: "10-15 minutes",
    description: "A quick activation routine to perform before running to prime the muscles and improve performance.",
    exercises: [
      "Leg Swings (forward/back) - 10 each leg",
      "Leg Swings (side to side) - 10 each leg",
      "Walking Lunges with Rotation - 8 each leg",
      "Glute Bridges - 15 reps",
      "High Knees - 30 seconds",
      "Butt Kicks - 30 seconds",
      "Jumping Jacks - 30 seconds",
    ],
  },
];

function StrengthPage() {
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Strength <span>Training</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Improve your running performance and prevent injuries with targeted strength exercises and workout plans
        </PageSubtitle>
      </PageHeader>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Exercises" icon={<FitnessCenterIcon />} iconPosition="start" />
        <Tab label="Workout Plans" icon={<DirectionsRunIcon />} iconPosition="start" />
      </Tabs>

      {/* Exercises Tab */}
      {tabValue === 0 && (
        <Box>
          {exerciseCategories.map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {category.icon}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {category.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                {category.exercises.map((exercise, exerciseIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={exerciseIndex}>
                    <ExerciseCard>
                      <ExerciseImage>
                        <FitnessCenterIcon sx={{ fontSize: 60, color: 'primary.main', opacity: 0.5 }} />
                      </ExerciseImage>
                      <ExerciseChip 
                        label={exercise.difficulty} 
                        color={
                          exercise.difficulty === 'Beginner' ? 'success' : 
                          exercise.difficulty === 'Intermediate' ? 'primary' : 
                          'error'
                        }
                        size="small"
                      />
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {exercise.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Targets:</strong> {exercise.muscle}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {exercise.instructions}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <RepeatIcon color="primary" sx={{ mr: 1, fontSize: '1.1rem' }} />
                          <Typography variant="body2" fontWeight={600}>
                            {exercise.sets}
                          </Typography>
                          <Box sx={{ mx: 2, width: 4, height: 4, borderRadius: '50%', bgcolor: 'divider' }} />
                          <TimerIcon color="primary" sx={{ mr: 1, fontSize: '1.1rem' }} />
                          <Typography variant="body2" fontWeight={600}>
                            {exercise.duration || `${exercise.reps}`}
                          </Typography>
                        </Box>
                      </CardContent>
                    </ExerciseCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {/* Workout Plans Tab */}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Runner's Strength Workouts
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Complete workout routines designed specifically for runners to improve performance and prevent injuries.
          </Typography>

          {workoutPlans.map((workout, index) => (
            <WorkoutContainer elevation={1} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  {workout.title}
                </Typography>
                <Chip 
                  icon={<TimerIcon />} 
                  label={workout.time} 
                  color="primary" 
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {workout.description}
              </Typography>
              <List dense>
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <ListItem key={exerciseIndex}>
                    <ListItemIcon>
                      <FitnessCenterIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={exercise} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Start Workout
                </Button>
              </Box>
            </WorkoutContainer>
          ))}
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<FitnessCenterIcon />}
            >
              Create Custom Workout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default StrengthPage; 