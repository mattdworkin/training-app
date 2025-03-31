import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Tooltip,
  InputAdornment,
  Fade,
  Paper,
  Zoom,
  styled 
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Main form container with enhanced visuals
const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: '550px',
  margin: '0 auto',
  padding: theme.spacing(6),
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '0 16px 50px rgba(255, 107, 149, 0.12)',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(255, 107, 149, 0.18)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #FF8FAF, #FF6B95)',
    borderRadius: '4px 4px 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },
}));

// Form title with visual enhancements
const FormTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: '1.75rem',
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingBottom: theme.spacing(2),
  textAlign: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #FF6B95, #FF8FAF)',
    borderRadius: '2px',
  },
}));

// Form subtitle
const FormSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  fontSize: '0.95rem',
}));

// Enhanced text field with animations and feedback
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: 12,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: '0 0 0 4px rgba(255, 140, 66, 0.1)',
    },
    '& .MuiInputAdornment-root': {
      color: theme.palette.text.secondary,
    },
    '&.Mui-focused .MuiInputAdornment-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 14px',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: '6px',
  },
}));

// Enhanced select with animations
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: 12,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: '0 0 0 4px rgba(255, 140, 66, 0.1)',
    },
    '& .MuiInputAdornment-root': {
      color: theme.palette.text.secondary,
    },
    '&.Mui-focused .MuiInputAdornment-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

// Enhanced submit button with ripple effect and loading state
const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF6B95 0%, #FF8FAF 100%)',
  border: 0,
  borderRadius: '999px',
  boxShadow: '0 8px 20px rgba(255, 107, 149, 0.2)',
  color: '#2C2C2C',
  minHeight: 56,
  padding: '0 32px',
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.5,
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginTop: theme.spacing(2),
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.1) 1%) center/15000%',
    opacity: 0,
    transition: 'background 0.5s, opacity 0.5s',
  },
  '&:active::after': {
    backgroundSize: '100%',
    opacity: 1,
    transition: '0s',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #E64D7A 0%, #FF6B95 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 28px rgba(255, 107, 149, 0.3)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 5px 15px rgba(255, 107, 149, 0.2)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1.5),
    '& svg': {
      fontSize: '1.4rem',
    },
  },
  '& .MuiTouchRipple-child': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

// Tooltip styles
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#FFFFFF',
  fontSize: '0.75rem',
  padding: '8px 12px',
  borderRadius: '8px',
  maxWidth: '250px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

// Decorative background elements
const BackgroundDecoration = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: position === 'top' ? '120px' : '150px',
  height: position === 'top' ? '120px' : '150px',
  background: `radial-gradient(circle, rgba(255, 107, 149, 0.0${position === 'top' ? '6' : '4'}) 0%, rgba(255, 255, 255, 0) 70%)`,
  borderRadius: '50%',
  top: position === 'top' ? '-20px' : 'auto',
  bottom: position === 'bottom' ? '-30px' : 'auto',
  right: position === 'top' ? '-20px' : 'auto',
  left: position === 'bottom' ? '-30px' : 'auto',
  zIndex: 0,
  pointerEvents: 'none',
}));

// Enhanced form with professional UX patterns
function UserForm({ formData, setFormData, onSubmit }) {
  const [touched, setTouched] = useState({});
  const [inputFocus, setInputFocus] = useState('');
  const [validForm, setValidForm] = useState(false);
  const [formAnimation, setFormAnimation] = useState(false);
  
  // Validate form fields
  const validate = (field, value) => {
    switch (field) {
      case 'age':
        return value >= 13 && value <= 100;
      case 'weight':
        return value >= 30 && value <= 200;
      case 'gender':
        return ['male', 'female', 'other'].includes(value);
      case 'weeklyMileage':
        return value >= 0 && value <= 50;
      default:
        return true;
    }
  };

  // Track field touch state for validation display
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    setInputFocus('');
    
    // Check overall form validity
    const isValid = Object.keys(formData).every(key => validate(key, formData[key]));
    setValidForm(isValid);
  };
  
  const handleFocus = (field) => {
    setInputFocus(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Check form validity on change
    const updatedData = { ...formData, [name]: value };
    const isValid = Object.keys(updatedData).every(key => validate(key, updatedData[key]));
    setValidForm(isValid);
  };

  // Trigger form animation on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFormAnimation(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={formAnimation} timeout={500}>
      <Box sx={{ position: 'relative' }}>
        <FormContainer elevation={6}>
          <BackgroundDecoration position="top" />
          <BackgroundDecoration position="bottom" />
          
          <FormTitle variant="h4">
            Create Your Training Plan
          </FormTitle>
          
          <FormSubtitle variant="body2">
            Fill in the details below and our clever fox will design a personalized training plan just for you.
          </FormSubtitle>
          
          <form onSubmit={onSubmit} noValidate>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <StyledTextField
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onFocus={() => handleFocus('age')}
                  onBlur={() => handleBlur('age')}
                  fullWidth
                  required
                  error={touched.age && !validate('age', formData.age)}
                  helperText={touched.age && !validate('age', formData.age) ? "Age must be between 13 and 100" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CakeIcon color={inputFocus === 'age' ? 'primary' : 'inherit'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <StyledTooltip title="Enter your age to help us determine the appropriate training intensity" placement="left">
                          <InfoOutlinedIcon sx={{ fontSize: '1rem', cursor: 'help', opacity: 0.7 }} />
                        </StyledTooltip>
                      </InputAdornment>
                    ),
                    inputProps: { min: 13, max: 100, 'aria-label': 'age' }
                  }}
                />
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <StyledTextField
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  onFocus={() => handleFocus('weight')}
                  onBlur={() => handleBlur('weight')}
                  fullWidth
                  required
                  error={touched.weight && !validate('weight', formData.weight)}
                  helperText={touched.weight && !validate('weight', formData.weight) ? "Weight must be between 30 and 200 kg" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitnessCenterIcon color={inputFocus === 'weight' ? 'primary' : 'inherit'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <StyledTooltip title="Your weight helps us calculate calories burned and proper pacing" placement="left">
                          <InfoOutlinedIcon sx={{ fontSize: '1rem', cursor: 'help', opacity: 0.7 }} />
                        </StyledTooltip>
                      </InputAdornment>
                    ),
                    inputProps: { min: 30, max: 200, 'aria-label': 'weight in kilograms' }
                  }}
                />
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <StyledFormControl 
                  fullWidth 
                  required
                  error={touched.gender && !validate('gender', formData.gender)}
                >
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={() => handleFocus('gender')}
                    onBlur={() => handleBlur('gender')}
                    label="Gender"
                    inputProps={{ 'aria-label': 'gender' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonIcon color={inputFocus === 'gender' ? 'primary' : 'inherit'} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </StyledFormControl>
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                <StyledTextField
                  label="Current Weekly Mileage"
                  type="number"
                  name="weeklyMileage"
                  value={formData.weeklyMileage}
                  onChange={handleChange}
                  onFocus={() => handleFocus('weeklyMileage')}
                  onBlur={() => handleBlur('weeklyMileage')}
                  fullWidth
                  required
                  error={touched.weeklyMileage && !validate('weeklyMileage', formData.weeklyMileage)}
                  helperText={touched.weeklyMileage && !validate('weeklyMileage', formData.weeklyMileage) ? "Weekly mileage must be between 0 and 50 miles" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsRunIcon color={inputFocus === 'weeklyMileage' ? 'primary' : 'inherit'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <StyledTooltip title="How many miles you currently run per week" placement="left">
                          <InfoOutlinedIcon sx={{ fontSize: '1rem', cursor: 'help', opacity: 0.7 }} />
                        </StyledTooltip>
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, max: 50, 'aria-label': 'weekly mileage' }
                  }}
                />
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <StyledButton
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!validForm}
                    startIcon={<DirectionsRunIcon />}
                  >
                    Generate My Training Plan
                  </StyledButton>
                </Box>
              </Zoom>
            </Box>
          </form>
        </FormContainer>
      </Box>
    </Fade>
  );
}

export default UserForm; 