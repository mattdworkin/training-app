import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
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
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const floatIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 18px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  borderRadius: 34,
  padding: theme.spacing(7, 3),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  background:
    'linear-gradient(120deg, rgba(255, 95, 127, 0.18) 0%, rgba(255, 141, 162, 0.11) 35%, rgba(17, 164, 165, 0.12) 100%)',
  boxShadow: `0 26px 50px ${alpha(theme.palette.secondary.main, 0.14)}`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(9, 7),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("/pattern.svg")',
    opacity: 0.08,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 340,
    height: 340,
    right: -120,
    top: -80,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.3)} 0%, transparent 68%)`,
    pointerEvents: 'none',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  maxWidth: 840,
  '& .accent': {
    background: 'linear-gradient(110deg, #ff4f72 0%, #12a8a6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 720,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  fontSize: '1.05rem',
}));

const HeroSpark = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.secondary.main, 0.9),
  color: '#fff',
  marginBottom: theme.spacing(2),
  '& .MuiChip-icon': {
    color: '#fff',
  },
}));

const QuickStats = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
  gap: theme.spacing(1.5),
}));

const StatCard = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.12)}`,
  backgroundColor: alpha('#ffffff', 0.78),
  padding: theme.spacing(2),
  backdropFilter: 'blur(6px)',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 24px 34px ${alpha(theme.palette.secondary.main, 0.16)}`,
    borderColor: alpha(theme.palette.primary.main, 0.32),
  },
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  backgroundColor: alpha(theme.palette.primary.main, 0.14),
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const CtaSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(3),
  borderRadius: 28,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  background: 'linear-gradient(125deg, #ff5f7f 0%, #ff8aa0 52%, #ffac66 100%)',
  color: '#fff',
  padding: theme.spacing(6, 3),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7),
  },
}));

const features = [
  {
    title: 'Training Plan',
    description: 'Personalized weekly schedules that adapt to your current mileage and goals.',
    icon: <DirectionsRunIcon fontSize="large" />,
    path: '/training',
  },
  {
    title: 'Recovery',
    description: 'Interactive injury prevention guidance to keep your consistency strong.',
    icon: <HealingIcon fontSize="large" />,
    path: '/recovery',
  },
  {
    title: 'Race Prep',
    description: 'Race strategy timelines and readiness tracking for every distance.',
    icon: <EmojiEventsIcon fontSize="large" />,
    path: '/races',
  },
  {
    title: 'Performance',
    description: 'Metrics, trends, and charts that make your progress impossible to ignore.',
    icon: <ShowChartIcon fontSize="large" />,
    path: '/performance',
  },
  {
    title: 'Mental',
    description: 'Focus training, mantras, and mindset tools for hard training days.',
    icon: <PsychologyIcon fontSize="large" />,
    path: '/mental',
  },
  {
    title: 'Nutrition',
    description: 'Fueling plans and hydration guidance tuned to your running demands.',
    icon: <RestaurantIcon fontSize="large" />,
    path: '/nutrition',
  },
  {
    title: 'Community',
    description: 'Group challenges and social motivation to keep the spark alive.',
    icon: <PeopleIcon fontSize="large" />,
    path: '/community',
  },
  {
    title: 'Strength',
    description: 'Runner-focused strength routines to improve power and durability.',
    icon: <FitnessCenterIcon fontSize="large" />,
    path: '/strength',
  },
  {
    title: 'Devices',
    description: 'Sync watches and apps for smarter training feedback loops.',
    icon: <WatchIcon fontSize="large" />,
    path: '/devices',
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ animation: `${floatIn} 520ms ease` }}>
      <HeroSection>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <HeroSpark icon={<AutoAwesomeRoundedIcon />} label="Playful legacy, modern precision" />
          <HeroTitle variant="h2">
            Run smarter with a <span className="accent">beautifully guided</span> training companion.
          </HeroTitle>
          <HeroSubtitle variant="h6">
            Training Fox blends the original charm of the app with a sharper, more interactive experience so every session feels purposeful and fun.
          </HeroSubtitle>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/training')}
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              Build My Plan
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/performance')}
            >
              Explore Analytics
            </Button>
          </Stack>

          <QuickStats>
            <StatCard>
              <Typography variant="overline" color="text.secondary">
                Weekly Consistency
              </Typography>
              <Typography variant="h5">+22%</Typography>
            </StatCard>
            <StatCard>
              <Typography variant="overline" color="text.secondary">
                Guided Workouts
              </Typography>
              <Typography variant="h5">9 Modules</Typography>
            </StatCard>
            <StatCard>
              <Typography variant="overline" color="text.secondary">
                Experience Style
              </Typography>
              <Typography variant="h5">Interactive</Typography>
            </StatCard>
            <StatCard>
              <Typography variant="overline" color="text.secondary">
                Fox Energy
              </Typography>
              <Typography variant="h5">100%</Typography>
            </StatCard>
          </QuickStats>
        </Box>
      </HeroSection>

      <Container disableGutters>
        <SectionHeader>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Everything You Need In One Flow
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
            Jump into any module quickly. Each section is designed to feel connected, tactile, and motivating.
          </Typography>
        </SectionHeader>

        <Grid container spacing={2.5}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <FeatureCard
                onClick={() => navigate(feature.path)}
                sx={{ animation: `${floatIn} ${380 + index * 55}ms ease` }}
              >
                <CardContent sx={{ p: 3.2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2.5, flexGrow: 1 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    endIcon={<ArrowOutwardRoundedIcon />}
                    sx={{ alignSelf: 'flex-start', px: 0 }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        <CtaSection>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Start a new running chapter today.
          </Typography>
          <Typography sx={{ mb: 3, maxWidth: 680, mx: 'auto', opacity: 0.94 }}>
            Keep the original spark, upgrade your routine, and let each week feel intentional.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/training')}
            sx={{
              backgroundColor: '#fff',
              color: '#1f2a44',
              '&:hover': { backgroundColor: '#ffffff' },
            }}
          >
            Create My Personalized Plan
          </Button>
        </CtaSection>
      </Container>
    </Box>
  );
}

export default HomePage;
