import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import HealingIcon from '@mui/icons-material/Healing';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HotelIcon from '@mui/icons-material/Hotel';
import WaterIcon from '@mui/icons-material/Water';
import SpaIcon from '@mui/icons-material/Spa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    width: 104,
    borderRadius: 2,
    background: 'linear-gradient(90deg, #ff5f7f 0%, #11a4a5 100%)',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  '& span': {
    background: 'linear-gradient(105deg, #ff5f7f 0%, #11a4a5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const BodyMapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 420,
  margin: '0 auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  borderRadius: 24,
  background: `linear-gradient(140deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  boxShadow: `0 18px 32px ${alpha(theme.palette.secondary.main, 0.12)}`,
  paddingTop: '155%',
  overflow: 'hidden',
}));

const BodyMapCanvas = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const InjuryHotspot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  position: 'absolute',
  width: 22,
  height: 22,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.76),
  cursor: 'pointer',
  transition: 'transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease',
  boxShadow: active
    ? `0 0 0 8px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 0 16px ${alpha(theme.palette.primary.main, 0.12)}`
    : `0 0 0 5px ${alpha(theme.palette.primary.main, 0.2)}`,
  animation: active ? 'pulseHotspot 1.8s ease-out infinite' : 'none',
  '&:hover': {
    transform: 'scale(1.12)',
    backgroundColor: theme.palette.primary.dark,
  },
  '@keyframes pulseHotspot': {
    '0%': { boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0.32)}` },
    '100%': { boxShadow: `0 0 0 18px ${alpha(theme.palette.primary.main, 0)}` },
  },
}));

const RecoveryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 20,
  transition: 'transform 240ms ease, box-shadow 240ms ease',
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 20px 32px ${alpha(theme.palette.secondary.main, 0.15)}`,
  },
}));

const RecoveryCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 176,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '36%',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0) 100%)',
  },
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  width: 46,
  height: 46,
  marginBottom: theme.spacing(2),
}));

const injuryHotspots = [
  { id: 1, name: "Runner's Knee", position: { top: '48%', left: '36%' }, description: 'Pain around or behind the kneecap. Often linked to overuse, form issues, or weak stabilizer muscles.' },
  { id: 2, name: 'IT Band Syndrome', position: { top: '45%', left: '31%' }, description: 'Pain on the outside of the knee from repetitive friction in the iliotibial band.' },
  { id: 3, name: 'Shin Splints', position: { top: '56%', left: '45%' }, description: 'Pain along the shinbone, commonly triggered by sudden load increases or poor footwear.' },
  { id: 4, name: 'Plantar Fasciitis', position: { top: '75%', left: '45%' }, description: 'Heel and arch pain caused by inflammation of the plantar fascia.' },
  { id: 5, name: 'Achilles Tendinitis', position: { top: '66%', left: '56%' }, description: 'Tenderness at the back of the ankle from repetitive stress on the Achilles tendon.' },
  { id: 6, name: 'Hamstring Strain', position: { top: '38%', left: '56%' }, description: 'Posterior thigh pain from overstretching or sudden acceleration.' },
  { id: 7, name: 'Hip Flexor Strain', position: { top: '32%', left: '45%' }, description: 'Front hip discomfort often caused by overuse, posture issues, or aggressive speed sessions.' },
];

const recoveryMethods = [
  {
    title: 'Active Recovery',
    description: 'Low-intensity movement that boosts circulation and helps clear fatigue without adding stress.',
    icon: <TimerIcon />,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=70',
    tips: [
      'Easy walk or light jog for 20-40 minutes',
      'Low-resistance cycling or easy swim',
      'Keep intensity below 60% max heart rate',
      'Use relaxed nasal breathing to stay easy',
      'Pair with post-workout mobility',
    ],
  },
  {
    title: 'Sleep Quality',
    description: 'Deep sleep is where your body repairs tissue, restores hormones, and rebuilds training readiness.',
    icon: <HotelIcon />,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=70',
    tips: [
      'Target 7-9 hours each night',
      'Keep a consistent sleep/wake schedule',
      'Make your room cool, dark, and quiet',
      'Avoid screens for 45-60 minutes pre-bed',
      'Use a short wind-down routine',
    ],
  },
  {
    title: 'Hydration',
    description: 'Fluid balance helps transport nutrients, maintain blood volume, and speed recovery.',
    icon: <WaterIcon />,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=70',
    tips: [
      'Hydrate steadily throughout the day',
      'Replace electrolytes after long or hot runs',
      'Use urine color as a quick hydration check',
      'Sip during sessions longer than 45 minutes',
      'Start sessions already hydrated',
    ],
  },
  {
    title: 'Foam Rolling',
    description: 'Self-myofascial release can reduce stiffness and improve movement quality between sessions.',
    icon: <SpaIcon />,
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=900&q=70',
    tips: [
      'Roll each major area for 60-90 seconds',
      'Pause on tight spots and breathe slowly',
      'Avoid direct pressure on joints',
      'Pair rolling with dynamic mobility',
      'Use 3-5 sessions per week for consistency',
    ],
  },
];

function RunnerSilhouette() {
  return (
    <svg viewBox="0 0 220 360" width="78%" height="92%" aria-label="Runner body map">
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff8aa0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff5f7f" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="44" r="28" fill="url(#bodyGradient)" />
      <rect x="82" y="78" width="56" height="94" rx="28" fill="url(#bodyGradient)" />
      <rect x="58" y="92" width="22" height="86" rx="11" fill="url(#bodyGradient)" />
      <rect x="140" y="92" width="22" height="86" rx="11" fill="url(#bodyGradient)" />
      <rect x="84" y="170" width="22" height="136" rx="11" fill="url(#bodyGradient)" />
      <rect x="114" y="170" width="22" height="136" rx="11" fill="url(#bodyGradient)" />
      <ellipse cx="96" cy="326" rx="20" ry="10" fill="url(#bodyGradient)" />
      <ellipse cx="126" cy="326" rx="20" ry="10" fill="url(#bodyGradient)" />
    </svg>
  );
}

function RecoveryPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const selectedInjury = injuryHotspots.find((spot) => spot.id === selectedHotspot);

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Recovery & <span>Injury Prevention</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Protect your consistency with practical recovery routines and interactive injury guidance.
        </PageSubtitle>
      </PageHeader>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="fullWidth"
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ '& .MuiTab-root': { fontWeight: 700 } }}
        >
          <Tab label="Injury Map" icon={<LocalHospitalIcon />} iconPosition="start" />
          <Tab label="Recovery Methods" icon={<HealingIcon />} iconPosition="start" />
          <Tab label="Stretch Lab" icon={<FitnessCenterIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <Box>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
            Interactive Body Map
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4, maxWidth: 760, mx: 'auto' }}>
            Tap the highlighted hotspots to inspect common runner injuries, understand why they happen, and see prevention actions.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <BodyMapContainer>
                <BodyMapCanvas>
                  <RunnerSilhouette />
                </BodyMapCanvas>
                {injuryHotspots.map((hotspot) => (
                  <Tooltip key={hotspot.id} title={hotspot.name}>
                    <InjuryHotspot
                      style={hotspot.position}
                      active={selectedHotspot === hotspot.id}
                      onClick={() => setSelectedHotspot(hotspot.id === selectedHotspot ? null : hotspot.id)}
                    />
                  </Tooltip>
                ))}
              </BodyMapContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, height: '100%', backgroundColor: 'background.subtle', border: 1, borderColor: 'divider' }}>
                {selectedInjury ? (
                  <>
                    <Typography variant="h5" color="primary.main" fontWeight={800} gutterBottom>
                      {selectedInjury.name}
                    </Typography>
                    <Typography variant="body1">{selectedInjury.description}</Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Prevention Checklist
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Increase volume gradually (10% rule)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Strength train 2-3 times per week" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Rotate shoes and monitor wear patterns" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Warm up dynamically and cool down intentionally" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Respect pain signals early instead of pushing through" />
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReportProblemIcon sx={{ fontSize: 58, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" textAlign="center">
                      Select a hotspot to view injury details and prevention tips.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
            Recovery Methods
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 5, maxWidth: 760, mx: 'auto' }}>
            Use these proven routines to reduce soreness, accelerate adaptation, and stay consistent week to week.
          </Typography>

          <Grid container spacing={4}>
            {recoveryMethods.map((method) => (
              <Grid item xs={12} md={6} key={method.title}>
                <RecoveryCard>
                  <RecoveryCardMedia image={method.image} title={method.title} />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconAvatar>{method.icon}</IconAvatar>
                      <Typography variant="h5" sx={{ ml: 2 }} fontWeight={700}>
                        {method.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {method.description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      How to apply it
                    </Typography>
                    <List dense>
                      {method.tips.map((tip) => (
                        <ListItem key={tip} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 34 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </RecoveryCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedTab === 2 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Stretch Lab (Beta)
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 760, mx: 'auto' }}>
            Guided stretching flows are being crafted with coaches and physios. Join the waitlist to get the first release.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Notify Me First
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default RecoveryPage;
