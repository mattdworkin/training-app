import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Container,
  Paper,
  Avatar,
  useTheme,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HealingIcon from '@mui/icons-material/Healing';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WatchIcon from '@mui/icons-material/Watch';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 2),
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 16,
  backgroundColor: theme.palette.background.subtle,
  marginBottom: theme.spacing(8),
  backgroundImage: 'linear-gradient(135deg, rgba(255, 107, 149, 0.1) 0%, rgba(255, 107, 149, 0.05) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/pattern.svg")',
    backgroundSize: 'cover',
    opacity: 0.03,
    zIndex: 0,
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '& span': {
    color: theme.palette.primary.main,
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
  },
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#FFFFFF',
  width: 56,
  height: 56,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(255, 107, 149, 0.3)',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40%',
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
}));

const CtaButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 6px 20px rgba(255, 107, 149, 0.25)',
  '&:hover': {
    boxShadow: '0 8px 26px rgba(255, 107, 149, 0.35)',
    transform: 'translateY(-2px)',
  },
}));

// Feature data
const features = [
  {
    title: 'Training Plan',
    description: 'Personalized running plans based on your fitness level, goals, and schedule.',
    icon: <DirectionsRunIcon fontSize="large" />,
    path: '/training'
  },
  {
    title: 'Recovery & Injury Prevention',
    description: 'Smart recovery recommendations and strategies to prevent common running injuries.',
    icon: <HealingIcon fontSize="large" />,
    path: '/recovery'
  },
  {
    title: 'Race Preparation',
    description: 'Comprehensive guides for preparing for races of any distance with custom tapering.',
    icon: <EmojiEventsIcon fontSize="large" />,
    path: '/races'
  },
  {
    title: 'Performance Analysis',
    description: 'Track your progress with detailed analytics, pace calculators, and visualizations.',
    icon: <ShowChartIcon fontSize="large" />,
    path: '/performance'
  },
  {
    title: 'Mental Training',
    description: 'Mental techniques, visualization exercises, and motivational content for runners.',
    icon: <PsychologyIcon fontSize="large" />,
    path: '/mental'
  },
  {
    title: 'Nutrition Guidance',
    description: 'Meal planning, race-day fueling strategies, and hydration recommendations.',
    icon: <RestaurantIcon fontSize="large" />,
    path: '/nutrition'
  },
  {
    title: 'Runner Community',
    description: 'Connect with fellow runners, join challenges, and share your achievements.',
    icon: <PeopleIcon fontSize="large" />,
    path: '/community'
  },
  {
    title: 'Strength Training',
    description: 'Runner-specific strength workouts to improve performance and prevent injuries.',
    icon: <FitnessCenterIcon fontSize="large" />,
    path: '/strength'
  },
  {
    title: 'Device Integration',
    description: 'Sync with your favorite running watches, fitness trackers, and health apps.',
    icon: <WatchIcon fontSize="large" />,
    path: '/devices'
  }
];

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <HeroSection>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <HeroTitle variant="h2">
            Your Smart Running <span>Companion</span>
          </HeroTitle>
          <HeroSubtitle variant="h6">
            Training Fox helps you train smarter, recover faster, and perform better with personalized plans, 
            advanced analytics, and expert guidance for runners of all levels.
          </HeroSubtitle>
          <CtaButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleNavigate('/training')}
          >
            Create Your Training Plan
          </CtaButton>
        </Box>
      </HeroSection>

      <Container>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <SectionTitle variant="h3">
            Why Runners Love Training Fox
          </SectionTitle>
          <SectionSubtitle variant="body1">
            Our all-in-one platform combines personalized training, advanced analytics, 
            and expert coaching to help you reach your running goals.
          </SectionSubtitle>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard onClick={() => handleNavigate(feature.path)}>
                <CardContent sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <FeatureTitle variant="h5">
                    {feature.title}
                  </FeatureTitle>
                  <FeatureDescription variant="body2">
                    {feature.description}
                  </FeatureDescription>
                  <Button 
                    sx={{ mt: 2 }}
                    color="primary"
                    onClick={() => handleNavigate(feature.path)}
                  >
                    Explore
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, mb: 10, textAlign: 'center' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              borderRadius: 4, 
              backgroundImage: 'linear-gradient(135deg, #FF6B95 0%, #FF8FAF 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Ready to Transform Your Running?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
              Join thousands of runners who use Training Fox to achieve their personal bests, stay injury-free, 
              and enjoy their running journey.
            </Typography>
            <CtaButton
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleNavigate('/training')}
              sx={{ 
                backgroundColor: 'white', 
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            >
              Start Your Journey
            </CtaButton>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage; 