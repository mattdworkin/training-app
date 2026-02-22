import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
  Chip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HealingIcon from '@mui/icons-material/Healing';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WatchIcon from '@mui/icons-material/Watch';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  background: `linear-gradient(110deg, ${alpha('#ffffff', 0.88)} 0%, ${alpha('#fff7fa', 0.86)} 100%)`,
  backdropFilter: 'blur(14px)',
  borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  boxShadow: `0 10px 24px ${alpha(theme.palette.secondary.main, 0.08)}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 78,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const BrandButton = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.2),
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: 999,
  padding: theme.spacing(0.9, 1.5),
  transition: 'transform 220ms ease, background-color 220ms ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const FoxBadge = styled('span')(({ theme }) => ({
  fontSize: '1.6rem',
  filter: `drop-shadow(0 8px 10px ${alpha(theme.palette.primary.main, 0.28)})`,
  transition: 'transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  display: 'inline-block',
  transform: 'rotate(-5deg)',
  animation: 'foxWiggle 4.2s ease-in-out infinite',
  '@keyframes foxWiggle': {
    '0%, 100%': {
      transform: 'rotate(-5deg)',
    },
    '50%': {
      transform: 'rotate(7deg)',
    },
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.secondary.main,
  fontSize: '1.1rem',
  letterSpacing: '0.01em',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

const NavWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: 999,
  fontWeight: 700,
  paddingInline: theme.spacing(2),
  color: active ? theme.palette.primary.dark : theme.palette.secondary.main,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.14) : 'transparent',
  border: active ? `1px solid ${alpha(theme.palette.primary.main, 0.24)}` : '1px solid transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

const UtilityButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 14,
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.14)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 320,
  maxWidth: '100vw',
  padding: theme.spacing(1.5),
}));

const DrawerBrand = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 1.25),
}));

const navigationItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Training Plan', icon: <DirectionsRunIcon />, path: '/training-plan' },
  { text: 'Recovery', icon: <HealingIcon />, path: '/recovery' },
  { text: 'Race Prep', icon: <EmojiEventsIcon />, path: '/races' },
  { text: 'Performance', icon: <ShowChartIcon />, path: '/performance' },
  { text: 'Mental', icon: <PsychologyIcon />, path: '/mental' },
  { text: 'Nutrition', icon: <RestaurantIcon />, path: '/nutrition' },
  { text: 'Community', icon: <PeopleIcon />, path: '/community' },
  { text: 'Strength', icon: <FitnessCenterIcon />, path: '/strength' },
  { text: 'Devices', icon: <WatchIcon />, path: '/devices' },
];

const desktopItems = ['/', '/training-plan', '/performance', '/recovery', '/nutrition'];

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const normalizePath = (path) => (path === '/training' ? '/training-plan' : path);
  const currentPath = normalizePath(location.pathname);
  const isActivePath = (path) => currentPath === normalizePath(path);

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleSurprise = () => {
    const pool = navigationItems.filter((item) => !isActivePath(item.path));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) {
      navigate(pick.path);
      setDrawerOpen(false);
    }
  };

  return (
    <StyledAppBar elevation={0}>
      <StyledToolbar>
        <BrandButton onClick={() => handleNavigation('/')} aria-label="Go to home">
          <FoxBadge>🦊</FoxBadge>
          <Title>Training Fox</Title>
        </BrandButton>

        {!isMobile ? (
          <NavWrap>
            {desktopItems.map((path) => {
              const item = navigationItems.find((navItem) => navItem.path === path);
              if (!item) {
                return null;
              }

              return (
                <NavButton
                  key={item.path}
                  active={isActivePath(item.path) ? 1 : 0}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              );
            })}

            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
              label="Legacy spark mode"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.primary.main, 0.3) }}
            />

            <Tooltip title="Take me somewhere fun">
              <UtilityButton aria-label="Surprise me" onClick={handleSurprise}>
                <ShuffleRoundedIcon />
              </UtilityButton>
            </Tooltip>

            <UtilityButton aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
              <MenuRoundedIcon />
            </UtilityButton>
          </NavWrap>
        ) : (
          <NavWrap>
            <Tooltip title="Surprise me">
              <UtilityButton aria-label="Surprise me" onClick={handleSurprise}>
                <ShuffleRoundedIcon />
              </UtilityButton>
            </Tooltip>
            <UtilityButton aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
              <MenuRoundedIcon />
            </UtilityButton>
          </NavWrap>
        )}
      </StyledToolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent role="presentation">
          <DrawerBrand>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="span" sx={{ fontSize: '1.4rem' }}>
                🦊
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                Explore
              </Typography>
            </Box>
            <Tooltip title="Surprise me">
              <IconButton size="small" onClick={handleSurprise}>
                <ShuffleRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </DrawerBrand>
          <Divider sx={{ mb: 1.5 }} />
          <List disablePadding>
            {navigationItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActivePath(item.path)}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.14),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActivePath(item.path) ? 700 : 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </StyledAppBar>
  );
}

export default Header;
