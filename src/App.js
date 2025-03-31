import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, CircularProgress, styled, Alert, Snackbar } from '@mui/material';
import Header from './components/Header';
import UserForm from './components/UserForm';
import TrainingPlan from './components/TrainingPlan';
import { DataService } from './utils/DataService';

// Import pages for new features
import HomePage from './pages/HomePage';
import RecoveryPage from './pages/RecoveryPage';
import RacesPage from './pages/RacesPage';
import PerformancePage from './pages/PerformancePage';
import MentalPage from './pages/MentalPage';
import NutritionPage from './pages/NutritionPage';
import CommunityPage from './pages/CommunityPage';
import StrengthPage from './pages/StrengthPage';
import DevicesPage from './pages/DevicesPage';

// Create a professional theme with design system
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B95',
      light: '#FF8FAF',
      dark: '#E64D7A',
      contrastText: '#2C2C2C',
    },
    secondary: {
      main: '#2C2C2C',
      light: '#4A4A4A',
      dark: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    accent: {
      light: '#FFD9E4',
      main: '#FF8FAF',
      dark: '#E64D7A',
    },
    background: {
      default: '#FFF9FB',
      paper: '#FFFFFF',
      subtle: 'rgba(255, 107, 149, 0.04)',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
      hint: '#888888',
    },
    error: {
      light: '#FF8E8E',
      main: '#FF6B6B',
      dark: '#E64A4A',
    },
    warning: {
      light: '#FFE082',
      main: '#FFC107',
      dark: '#FFA000',
    },
    success: {
      light: '#81C784',
      main: '#4CAF50',
      dark: '#388E3C',
    },
    info: {
      light: '#90CAF9',
      main: '#2196F3',
      dark: '#1976D2',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  spacing: factor => `${0.5 * factor}rem`,
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      marginBottom: '0.5em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
      marginBottom: '0.5em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: 0,
      marginBottom: '0.5em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0.005em',
      marginBottom: '0.5em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
      marginBottom: '0.5em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
      marginBottom: '0.5em',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
      letterSpacing: '0.005em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 500,
      letterSpacing: '0.005em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.02)',
    '0px 4px 8px rgba(0, 0, 0, 0.04)',
    '0px 6px 12px rgba(0, 0, 0, 0.06)',
    '0px 8px 16px rgba(0, 0, 0, 0.08)',
    '0px 10px 20px rgba(0, 0, 0, 0.10)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    ...Array(17).fill('none'), // Fill the rest of the array
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          transition: 'background-color 0.2s ease-in-out',
        },
        '::selection': {
          backgroundColor: 'rgba(255, 107, 149, 0.2)',
        },
        ':focus-visible': {
          outline: '2px solid #FF6B95',
          outlineOffset: '2px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          '@media (min-width: 600px)': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          padding: '0.75rem 1.5rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          textTransform: 'none',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.1) 1%) center/15000%',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'background-size 0.3s, opacity 0.3s',
          },
          '&:active::after': {
            backgroundSize: '100%',
            opacity: 1,
            transition: '0s',
          },
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 107, 149, 0.2)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: '0 2px 10px rgba(255, 107, 149, 0.15)',
            transform: 'translateY(0)',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #FF6B95 0%, #FF8FAF 100%)',
            color: '#2C2C2C',
            '&:hover': {
              background: 'linear-gradient(135deg, #E64D7A 0%, #FF6B95 100%)',
            },
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#FF6B95',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 149, 0.04)',
            },
          },
        },
        text: {
          '&.MuiButton-textPrimary': {
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 149, 0.04)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at top left, rgba(255, 140, 66, 0.08), transparent 40%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          },
          '&:hover::before': {
            opacity: 1,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#FF6B95',
              borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B95',
              borderWidth: '2px',
              boxShadow: '0 0 0 4px rgba(255, 107, 149, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-focused': {
              color: '#FF6B95',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B95',
              borderWidth: '2px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B95',
              borderWidth: '2px',
              boxShadow: '0 0 0 4px rgba(255, 107, 149, 0.1)',
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#FF6B95',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

// Styled components
const AppContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    right: '-10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 107, 149, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '10%',
    left: '-5%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255, 107, 149, 0.06) 0%, rgba(255, 255, 255, 0) 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: -1,
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: theme.spacing(4),
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.subtle,
  borderRadius: 24,
  marginTop: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255, 107, 149, 0.03) 0%, rgba(255, 255, 255, 0) 60%)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': { opacity: 0.3 },
    '50%': { opacity: 0.8 },
    '100%': { opacity: 0.3 },
  },
}));

const LoadingText = styled(Box)(({ theme }) => ({
  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textAlign: 'center',
  maxWidth: '300px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '3px',
    background: 'linear-gradient(90deg, rgba(255, 107, 149, 0) 0%, rgba(255, 107, 149, 0.5) 50%, rgba(255, 107, 149, 0) 100%)',
    borderRadius: '3px',
  },
}));

// Training plan generator component with form
function TrainingGenerator() {
  const [formData, setFormData] = useState({
    age: 30,
    weight: 70,
    gender: 'male',
    weeklyMileage: 20,
  });
  
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Call API to generate training plan
      const result = await DataService.generateTrainingPlan(formData);
      
      // Set fitness level and training plan from API response
      setFitnessLevel(result.fitnessLevel);
      setTrainingPlan(result.trainingPlan);
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('Sorry! Failed to generate training plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setTrainingPlan(null);
    setFitnessLevel(null);
  };

  const handleCloseError = () => {
    setError(null);
  };
  
  return (
    <>
      {!trainingPlan && !loading && (
        <UserForm 
          formData={formData} 
          setFormData={setFormData} 
          onSubmit={handleSubmit} 
        />
      )}
      
      {loading && (
        <LoadingContainer>
          <CircularProgress 
            size={80} 
            thickness={4} 
            sx={{ 
              color: theme => theme.palette.primary.main,
              boxShadow: '0 0 20px rgba(255, 107, 149, 0.2)',
            }} 
          />
          <LoadingText>
            Building your training plan...
            <span style={{ display: 'block', fontSize: '0.8rem', marginTop: '4px', opacity: 0.8 }}>
              Our fox is working hard for you!
            </span>
          </LoadingText>
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
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          sx={{ 
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }}
          elevation={6}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 