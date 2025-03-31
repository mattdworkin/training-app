import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FlagIcon from '@mui/icons-material/Flag';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

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

const RaceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const ChecklistItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
}));

const StrategyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
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

// Sample data
const upcomingRaces = [
  {
    id: 1,
    name: "Central Park 10K",
    date: "May 15, 2023",
    location: "New York, NY",
    distance: "10K",
    status: "Registered",
    readiness: 75,
    timeUntil: "4 weeks",
  },
  {
    id: 2,
    name: "Brooklyn Half Marathon",
    date: "June 12, 2023",
    location: "Brooklyn, NY",
    distance: "Half Marathon",
    status: "Training",
    readiness: 45,
    timeUntil: "8 weeks",
  },
  {
    id: 3,
    name: "NYC Marathon",
    date: "November 5, 2023",
    location: "New York, NY",
    distance: "Marathon",
    status: "Planning",
    readiness: 15,
    timeUntil: "22 weeks",
  },
];

const raceChecklist = [
  { label: "Race registration completed", completed: true },
  { label: "Hotel booking confirmed", completed: true },
  { label: "Travel arrangements made", completed: false },
  { label: "Race day nutrition planned", completed: false },
  { label: "Race gear prepared", completed: false },
  { label: "Course map reviewed", completed: true },
];

const raceTimeline = [
  { label: "16 weeks out", description: "Base building phase - Focus on easy miles and building endurance" },
  { label: "12 weeks out", description: "Early speedwork - Introduce tempo runs and hill workouts" },
  { label: "8 weeks out", description: "Peak training - Longest runs and most intense workouts" },
  { label: "3 weeks out", description: "Taper begins - Reduce volume while maintaining intensity" },
  { label: "Race week", description: "Final taper - Rest, carb loading, and mental preparation" },
];

const raceStrategies = [
  {
    title: "Pacing Strategy",
    description: "Maintain even splits throughout the race, starting conservatively to save energy for the final push.",
    icon: <ScheduleIcon />,
  },
  {
    title: "Nutrition Plan",
    description: "Fuel with carbs every 45 minutes. Hydrate at every aid station with water or sports drink.",
    icon: <LocalFireDepartmentIcon />,
  },
  {
    title: "Mental Tactics",
    description: "Break the race into smaller segments. Focus on form when fatigue sets in. Use mantras for tough moments.",
    icon: <DirectionsRunIcon />,
  },
  {
    title: "Course Strategy",
    description: "Save energy on hills. Take tangents on curves. Use downhills for recovery while maintaining pace.",
    icon: <PlaceIcon />,
  },
];

function RacesPage() {
  const [selectedRace, setSelectedRace] = useState(1);
  
  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Race <span>Preparation</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Plan and prepare for your upcoming races with personalized training plans, race-day strategies, and preparation checklists
        </PageSubtitle>
      </PageHeader>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Your Upcoming Races
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track your race calendar and preparation status for each event.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {upcomingRaces.map((race) => (
          <Grid item xs={12} md={4} key={race.id}>
            <RaceCard onClick={() => setSelectedRace(race.id)} sx={{ cursor: 'pointer' }}>
              <Box sx={{ 
                p: 2, 
                bgcolor: race.id === selectedRace ? 'primary.main' : 'transparent',
                color: race.id === selectedRace ? 'white' : 'inherit',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}>
                <Typography variant="h6" fontWeight={700}>
                  {race.name}
                </Typography>
              </Box>
              <CardContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EventIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2">
                        {race.date}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PlaceIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2">
                        {race.location}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsRunIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2">
                        {race.distance}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WatchLaterIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                      <Typography variant="body2">
                        {race.timeUntil}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Chip 
                  label={race.status} 
                  color={
                    race.status === 'Registered' ? 'success' : 
                    race.status === 'Training' ? 'primary' : 
                    'default'
                  }
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">Race Readiness</Typography>
                    <Typography variant="body2" fontWeight={600}>{race.readiness}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={race.readiness} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 107, 149, 0.1)',
                    }}
                  />
                </Box>
              </CardContent>
            </RaceCard>
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <RaceCard sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 107, 149, 0.05)',
            cursor: 'pointer',
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 56, 
                height: 56, 
                bgcolor: 'primary.main',
                margin: '0 auto',
                mb: 2
              }}>
                <AddIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Add New Race
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plan and prepare for your next race challenge
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Race
              </Button>
            </CardContent>
          </RaceCard>
        </Grid>
      </Grid>

      {selectedRace && (
        <React.Fragment>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Race Preparation: {upcomingRaces.find(race => race.id === selectedRace)?.name}
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Race Day Checklist
              </Typography>
              <Box>
                {raceChecklist.map((item, index) => (
                  <ChecklistItem elevation={1} key={index}>
                    <Avatar sx={{ 
                      bgcolor: item.completed ? 'success.main' : 'action.disabled', 
                      width: 36, 
                      height: 36,
                      mr: 2 
                    }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </ChecklistItem>
                ))}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
                    Add Item
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Training Timeline
                </Typography>
                <TimelineCard elevation={1}>
                  <List>
                    {raceTimeline.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <FlagIcon />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography fontWeight={600}>{item.label}</Typography>}
                            secondary={item.description}
                          />
                        </ListItem>
                        {index < raceTimeline.length - 1 && (
                          <Box sx={{ 
                            position: 'relative',
                            ml: 2.8,
                            height: 30,
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: 2,
                              backgroundColor: 'primary.main',
                              opacity: 0.3,
                            }
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </TimelineCard>
                
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Race Strategy
                </Typography>
                <Grid container spacing={3}>
                  {raceStrategies.map((strategy, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <StrategyCard elevation={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {strategy.icon}
                          </Avatar>
                          <Typography variant="h6" fontWeight={600}>
                            {strategy.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {strategy.description}
                        </Typography>
                      </StrategyCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<EmojiEventsIcon />}
            >
              Generate Race-Specific Training Plan
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default RacesPage; 