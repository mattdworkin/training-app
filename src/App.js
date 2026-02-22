import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Fab,
  Tooltip,
  Zoom,
  Chip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { createTheme, styled, alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Header from './components/Header';
import UserForm from './components/UserForm';
import TrainingPlan from './components/TrainingPlan';
import { DataService } from './utils/DataService';

import HomePage from './pages/HomePage';
import RecoveryPage from './pages/RecoveryPage';
import RacesPage from './pages/RacesPage';
import PerformancePage from './pages/PerformancePage';
import MentalPage from './pages/MentalPage';
import NutritionPage from './pages/NutritionPage';
import CommunityPage from './pages/CommunityPage';
import StrengthPage from './pages/StrengthPage';
import DevicesPage from './pages/DevicesPage';

const headingFont = '"Sora", "Avenir Next", "Segoe UI", sans-serif';
const bodyFont = '"Nunito Sans", "Trebuchet MS", "Segoe UI", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff5f7f',
      light: '#ff8aa0',
      dark: '#da3f63',
      contrastText: '#1f2430',
    },
    secondary: {
      main: '#1f2a44',
      light: '#3b4763',
      dark: '#131b2f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#11a4a5',
      light: '#48d0cb',
      dark: '#0a7f7d',
    },
    success: {
      main: '#2eaf63',
    },
    warning: {
      main: '#f5a524',
    },
    background: {
      default: '#fff6f8',
      paper: '#ffffff',
      subtle: alpha('#ff5f7f', 0.08),
    },
    text: {
      primary: '#1f2430',
      secondary: '#4f5770',
    },
    divider: alpha('#1f2a44', 0.1),
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: headingFont,
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 800,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h4: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h5: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h6: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@import':
          "url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&family=Sora:wght@500;600;700;800&display=swap')",
        '#root': {
          minHeight: '100vh',
        },
        body: {
          minHeight: '100vh',
          background:
            'radial-gradient(circle at 8% 2%, rgba(255, 121, 153, 0.24), transparent 38%), radial-gradient(circle at 88% 10%, rgba(17, 164, 165, 0.2), transparent 36%), linear-gradient(180deg, #fff6f8 0%, #fffdf8 52%, #fff8f2 100%)',
          color: '#1f2430',
          backgroundAttachment: 'fixed',
        },
        'body::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'url("/pattern.svg")',
          opacity: 0.05,
          zIndex: -2,
          animation: 'spinDrift 38s linear infinite',
        },
        'body::after': {
          content: '""',
          position: 'fixed',
          inset: '-18%',
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 30% 20%, rgba(255, 95, 127, 0.1), transparent 36%), radial-gradient(circle at 80% 70%, rgba(17, 164, 165, 0.1), transparent 33%)',
          filter: 'blur(10px)',
          animation: 'floatPulse 16s ease-in-out infinite',
          zIndex: -1,
        },
        '::selection': {
          backgroundColor: alpha('#ff5f7f', 0.25),
        },
        '@keyframes floatPulse': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -12px, 0) scale(1.02)' },
        },
        '@keyframes spinDrift': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(360deg) scale(1.03)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            animation: 'none !important',
            transition: 'none !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@media (min-width: 600px)': {
            paddingLeft: '1.6rem',
            paddingRight: '1.6rem',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '0.75rem 1.4rem',
          transition: 'transform 220ms ease, box-shadow 220ms ease, background 220ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #ff5f7f 0%, #ff8aa0 100%)',
          boxShadow: `0 14px 28px ${alpha('#ff5f7f', 0.28)}`,
          '&:hover': {
            background: 'linear-gradient(135deg, #da3f63 0%, #ff5f7f 100%)',
            boxShadow: `0 18px 32px ${alpha('#ff5f7f', 0.35)}`,
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha('#ff5f7f', 0.08),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: `1px solid ${alpha('#1f2a44', 0.08)}`,
          boxShadow: `0 12px 28px ${alpha('#1f2a44', 0.08)}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 4,
          borderRadius: 999,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 46,
          '&.Mui-selected': {
            backgroundColor: alpha('#ff5f7f', 0.12),
          },
        },
      },
    },
  },
});

const routeEnter = keyframes`
  from { opacity: 0; transform: translate3d(0, 14px, 0) scale(0.992); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
`;

const AppFrame = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  isolation: 'isolate',
  paddingBottom: theme.spacing(8),
}));

const AppContent = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  position: 'relative',
  zIndex: 2,
}));

const RouteStage = styled(Box)({
  animation: `${routeEnter} 420ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
});

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
  minHeight: 340,
  background: `linear-gradient(140deg, ${alpha('#ff5f7f', 0.1)} 0%, ${alpha('#11a4a5', 0.08)} 100%)`,
  borderRadius: 28,
  border: `1px solid ${alpha('#ff5f7f', 0.18)}`,
  boxShadow: `0 18px 36px ${alpha('#1f2a44', 0.12)}`,
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  fontFamily: headingFont,
  fontWeight: 700,
  color: theme.palette.secondary.main,
}));

function ScrollTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 260,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 20 }}>
        <Tooltip title="Back to top">
          <Fab color="primary" onClick={handleClick} size="medium" aria-label="Back to top">
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  );
}

function TrainingGenerator() {
  const [formData, setFormData] = useState({
    age: 30,
    weight: 70,
    weightUnit: 'kg',
    gender: 'male',
    weeklyMileage: 20,
  });

  const [trainingPlan, setTrainingPlan] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Building your perfect week...');

  const loadingMessages = [
    'Building your perfect week...',
    'Balancing miles, recovery, and momentum...',
    'Fox mode: crafting smart workouts...',
    'Shaping a plan that fits your current base...',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    setLoading(true);
    setError(null);

    try {
      const result = await DataService.generateTrainingPlan(formData);
      setFitnessLevel(result.fitnessLevel);
      setTrainingPlan(result.trainingPlan);
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('Could not generate your plan right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTrainingPlan(null);
    setFitnessLevel(null);
  };

  return (
    <>
      {!trainingPlan && !loading && (
        <UserForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      )}

      {loading && (
        <LoadingContainer>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="Smart Plan Generator"
            color="secondary"
            sx={{ color: 'white', backgroundColor: alpha('#1f2a44', 0.9) }}
          />
          <CircularProgress
            size={88}
            thickness={4}
            sx={{
              color: 'primary.main',
              filter: `drop-shadow(0 0 16px ${alpha('#ff5f7f', 0.35)})`,
            }}
          />
          <LoadingText variant="h5">{loadingMessage}</LoadingText>
          <Typography variant="body2" color="text.secondary">
            Our fox is mixing science with fun to personalize every day.
          </Typography>
        </LoadingContainer>
      )}

      {trainingPlan && !loading && (
        <TrainingPlan
          trainingData={trainingPlan}
          fitnessLevel={fitnessLevel}
          weeklyMileage={formData.weeklyMileage}
          onReset={handleReset}
        />
      )}

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5200}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{
            width: '100%',
            borderRadius: 2.5,
            boxShadow: `0 14px 28px ${alpha('#1f2a44', 0.2)}`,
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <RouteStage key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/training-plan" element={<TrainingGenerator />} />
        <Route path="/training" element={<TrainingGenerator />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/races" element={<RacesPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/mental" element={<MentalPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/strength" element={<StrengthPage />} />
        <Route path="/devices" element={<DevicesPage />} />
      </Routes>
    </RouteStage>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppFrame>
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-8%',
                left: '-6%',
                width: { xs: 240, md: 340 },
                height: { xs: 240, md: 340 },
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha('#ff5f7f', 0.18)} 0%, transparent 68%)`,
                filter: 'blur(1px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '-8%',
                top: '18%',
                width: { xs: 220, md: 300 },
                height: { xs: 220, md: 300 },
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha('#11a4a5', 0.14)} 0%, transparent 66%)`,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '12%',
                bottom: '-10%',
                width: { xs: 230, md: 320 },
                height: { xs: 230, md: 320 },
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha('#f5a524', 0.12)} 0%, transparent 68%)`,
              }}
            />
          </Box>
          <Header />
          <AppContent maxWidth="lg">
            <AnimatedRoutes />
          </AppContent>
          <ScrollTopButton />
        </AppFrame>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
