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
  styled,
} from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HotelIcon from '@mui/icons-material/Hotel';
import WaterIcon from '@mui/icons-material/Water';
import SpaIcon from '@mui/icons-material/Spa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  position: 'relative',
  display: 'inline-block',
}));

const BodyMapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const BodyMap = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
}));

const InjuryHotspot = styled(Box)(({ theme, active }) => ({
  position: 'absolute',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'rgba(255, 107, 149, 0.6)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: active ? 
    '0 0 0 8px rgba(255, 107, 149, 0.2), 0 0 0 16px rgba(255, 107, 149, 0.1)' : 
    '0 0 0 4px rgba(255, 107, 149, 0.2)',
  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: theme.palette.primary.main,
  },
}));

const RecoveryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const RecoveryCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 180,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
  }
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  width: 48,
  height: 48,
  marginBottom: theme.spacing(2),
}));

// Data for injury hotspots
const injuryHotspots = [
  { id: 1, name: 'Runner\'s Knee', position: { top: '45%', left: '35%' }, description: 'Pain around or behind the kneecap. Often caused by overuse, improper form, or weak leg muscles.' },
  { id: 2, name: 'IT Band Syndrome', position: { top: '42%', left: '32%' }, description: 'Pain on the outside of the knee. Typically caused by repetitive friction of the iliotibial band.' },
  { id: 3, name: 'Shin Splints', position: { top: '52%', left: '45%' }, description: 'Pain along the inner edge of the shinbone. Usually from overuse or improper footwear.' },
  { id: 4, name: 'Plantar Fasciitis', position: { top: '70%', left: '45%' }, description: 'Pain in the bottom of the foot, especially near the heel. Caused by inflammation of the plantar fascia.' },
  { id: 5, name: 'Achilles Tendinitis', position: { top: '60%', left: '55%' }, description: 'Pain at the back of the heel or ankle. Results from overuse of the Achilles tendon.' },
  { id: 6, name: 'Hamstring Strain', position: { top: '35%', left: '55%' }, description: 'Pain in the back of the thigh. Often due to overstretching or overloading the hamstring muscles.' },
  { id: 7, name: 'Hip Flexor Strain', position: { top: '30%', left: '45%' }, description: 'Pain in the front of the hip or groin. Typically from overuse or sudden movements.' },
];

// Recovery methods
const recoveryMethods = [
  {
    title: 'Active Recovery',
    description: 'Low-intensity exercise that promotes blood flow without stress on the body.',
    icon: <TimerIcon />,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tips: [
      'Easy walking or light jogging',
      'Swimming or water jogging',
      'Cycling with low resistance',
      'Gentle yoga or stretching routines',
      'Keep heart rate under 60% of max'
    ]
  },
  {
    title: 'Proper Sleep',
    description: 'Quality sleep is essential for muscle repair, recovery, and overall performance.',
    icon: <HotelIcon />,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tips: [
      'Aim for 7-9 hours per night',
      'Establish a consistent sleep schedule',
      'Create a dark, cool, quiet environment',
      'Avoid screens 1 hour before bed',
      'Practice relaxation techniques'
    ]
  },
  {
    title: 'Hydration',
    description: 'Proper fluid intake enhances recovery by helping transport nutrients to muscles.',
    icon: <WaterIcon />,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tips: [
      'Drink half your bodyweight in ounces daily',
      'Rehydrate with electrolytes after long runs',
      'Monitor urine color (aim for pale yellow)',
      'Carry water on all runs over 30 minutes',
      'Drink 16oz 2 hours before running'
    ]
  },
  {
    title: 'Foam Rolling',
    description: 'Self-myofascial release technique that helps reduce muscle tension and soreness.',
    icon: <SpaIcon />,
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    tips: [
      'Roll each muscle group for 1-2 minutes',
      'Focus on tender areas (trigger points)',
      'Avoid rolling directly on joints or bones',
      'Maintain relaxed breathing throughout',
      'Be consistent - aim for 3-5 times per week'
    ]
  }
];

function RecoveryPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleHotspotClick = (hotspotId) => {
    setSelectedHotspot(hotspotId === selectedHotspot ? null : hotspotId);
  };

  const selectedInjury = injuryHotspots.find(spot => spot.id === selectedHotspot);

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Recovery & <span>Injury Prevention</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Smart recovery strategies and personalized guidance to keep you running strong and injury-free
        </PageSubtitle>
      </PageHeader>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          centered
          TabIndicatorProps={{ style: { backgroundColor: '#FF6B95' } }}
        >
          <Tab label="Injury Prevention" icon={<LocalHospitalIcon />} iconPosition="start" />
          <Tab label="Recovery Methods" icon={<HealingIcon />} iconPosition="start" />
          <Tab label="Stretching Routines" icon={<FitnessCenterIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <Box>
          <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
            Interactive Body Map
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Click on the highlighted areas to learn about common running injuries, symptoms, and prevention strategies
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <BodyMapContainer>
                <BodyMap src="/images/runner-body-map.png" alt="Runner Body Map" />
                {injuryHotspots.map((hotspot) => (
                  <Tooltip key={hotspot.id} title={hotspot.name}>
                    <InjuryHotspot
                      style={hotspot.position}
                      active={(selectedHotspot === hotspot.id).toString()}
                      onClick={() => handleHotspotClick(hotspot.id)}
                    />
                  </Tooltip>
                ))}
              </BodyMapContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, height: '100%', backgroundColor: 'background.subtle' }}>
                {selectedInjury ? (
                  <>
                    <Typography variant="h5" color="primary.main" fontWeight={700} gutterBottom>
                      {selectedInjury.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedInjury.description}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Prevention Tips:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Maintain proper running form" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Increase training volume gradually (10% rule)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Wear appropriate footwear for your foot type" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Incorporate strength training 2-3 times per week" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Stretch and warm up properly before runs" />
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReportProblemIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" textAlign="center">
                      Select an area on the body map to view injury information
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
          <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
            Smart Recovery Techniques
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
            Implement these evidence-based recovery methods to reduce soreness, prevent injuries, and optimize your performance
          </Typography>

          <Grid container spacing={4}>
            {recoveryMethods.map((method, index) => (
              <Grid item xs={12} md={6} key={index}>
                <RecoveryCard>
                  <RecoveryCardMedia
                    image={method.image}
                    title={method.title}
                  />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconAvatar>
                        {method.icon}
                      </IconAvatar>
                      <Typography variant="h5" sx={{ ml: 2 }} fontWeight={600}>
                        {method.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {method.description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      How to implement:
                    </Typography>
                    <List dense>
                      {method.tips.map((tip, i) => (
                        <ListItem key={i} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
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
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Stretching Routines
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Coming soon! Our team of physical therapists and running coaches are creating
            customized stretching routines targeting common runner trouble spots.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mt: 2 }}
          >
            Get Notified When Available
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default RecoveryPage; 