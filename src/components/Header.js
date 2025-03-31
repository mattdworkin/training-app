import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  useScrollTrigger, 
  styled,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HealingIcon from '@mui/icons-material/Healing';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WatchIcon from '@mui/icons-material/Watch';

// Enhanced app bar with elevation scroll effect
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? '#FFFFFF' : 'transparent',
      boxShadow: trigger 
        ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
        : '0 4px 12px rgba(255, 107, 149, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  });
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: 'linear-gradient(135deg, #FF6B95 0%, #FF8FAF 100%)',
  boxShadow: '0 4px 12px rgba(255, 107, 149, 0.2)',
  borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  zIndex: 1100,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '6px',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
    zIndex: 1,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#2C2C2C',
  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  position: 'relative',
  letterSpacing: '0.02em',
  '& .fox-emoji': {
    fontSize: '1.5em',
    transform: 'rotate(-10deg)',
    transition: 'all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
    '&:hover': {
      transform: 'rotate(10deg) scale(1.2)',
      filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15))',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '55px',
    width: '60%',
    height: '2px',
    background: 'linear-gradient(90deg, rgba(44, 44, 44, 0.7) 0%, rgba(44, 44, 44, 0) 100%)',
    borderRadius: '2px',
    transform: 'scaleX(0.8)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(2),
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: '999px',
  textTransform: 'none',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  fontWeight: 600,
  color: '#2C2C2C',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
  },
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2, 0),
  '& .MuiListItem-root': {
    padding: theme.spacing(1.5, 3),
    margin: theme.spacing(0.5, 2),
    borderRadius: 8,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 107, 149, 0.08)',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: theme.palette.primary.main,
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Decorative elements
const Decoration = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: '120px',
  height: '120px',
  background: position === 'left' 
    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)' 
    : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
  borderRadius: '50%',
  top: position === 'left' ? '-20px' : '50%',
  left: position === 'left' ? '-20px' : 'auto',
  right: position === 'right' ? '-20px' : 'auto',
  transform: position === 'left' ? 'none' : 'translateY(-50%)',
  opacity: 0.8,
  zIndex: 0,
  pointerEvents: 'none',
}));

// List of navigation items for all features
const navigationItems = [
  { text: 'Home', icon: <DirectionsRunIcon />, path: '/' },
  { text: 'Training Plan', icon: <DirectionsRunIcon />, path: '/training-plan' },
  { text: 'Recovery & Injury Prevention', icon: <HealingIcon />, path: '/recovery' },
  { text: 'Race Preparation', icon: <EmojiEventsIcon />, path: '/races' },
  { text: 'Performance Analysis', icon: <ShowChartIcon />, path: '/performance' },
  { text: 'Mental Training', icon: <PsychologyIcon />, path: '/mental' },
  { text: 'Nutrition', icon: <RestaurantIcon />, path: '/nutrition' },
  { text: 'Community', icon: <PeopleIcon />, path: '/community' },
  { text: 'Strength Training', icon: <FitnessCenterIcon />, path: '/strength' },
  { text: 'Device Integration', icon: <WatchIcon />, path: '/devices' },
];

function Header(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animate, setAnimate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };
  
  // Toggle drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Trigger animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ElevationScroll {...props}>
      <StyledAppBar position="sticky">
        <Decoration position="left" />
        <Decoration position="right" />
        <StyledToolbar>
          <Decoration position="left" />
          <Decoration position="right" />
          <LogoContainer onClick={() => handleNavigation('/')}>
            <HeaderTitle 
              variant={isMobile ? "h5" : "h4"}
              sx={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <span className="fox-emoji">🦊</span>
              Training Fox
            </HeaderTitle>
          </LogoContainer>

          {!isMobile ? (
            <NavigationContainer>
              {/* Show only a few important navigation items on desktop */}
              <NavButton onClick={() => handleNavigation('/')}>
                Home
              </NavButton>
              <NavButton onClick={() => handleNavigation('/training-plan')}>
                Training
              </NavButton>
              <NavButton onClick={() => handleNavigation('/recovery')}>
                Recovery
              </NavButton>
              <NavButton onClick={() => handleNavigation('/races')}>
                Races
              </NavButton>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </NavigationContainer>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </StyledToolbar>

        {/* Navigation Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <DrawerContainer
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <DrawerHeader>
              <Typography variant="h6" fontWeight="bold">
                Training Fox Features
              </Typography>
            </DrawerHeader>
            <Divider />
            <List>
              {navigationItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </DrawerContainer>
        </Drawer>
      </StyledAppBar>
    </ElevationScroll>
  );
}

export default Header; 