import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
  Avatar,
  Chip,
  Divider,
  styled,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const MealTypeChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontWeight: 600,
}));

const WaterSlider = styled(Slider)(({ theme }) => ({
  color: '#3f95ea',
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    height: 10,
    borderRadius: 5,
  },
  '& .MuiSlider-rail': {
    height: 10,
    borderRadius: 5,
    opacity: 0.2,
  },
}));

// Sample nutrition data
const mealPlans = {
  preRun: [
    {
      name: 'Light Carb Boost',
      time: '1 hour before',
      description: 'A small carb-rich meal to fuel your run without weighing you down.',
      foods: [
        { name: 'Banana', calories: 105, notes: 'Easy to digest, provides quick energy' },
        { name: 'Whole grain toast', calories: 80, notes: 'Sustainable energy from complex carbs' },
        { name: 'Honey', calories: 60, notes: 'Quick energy boost' },
      ],
    },
    {
      name: 'Pre-Run Energy',
      time: '2 hours before',
      description: 'Balanced meal with carbs, moderate protein, and low fat for sustained energy.',
      foods: [
        { name: 'Oatmeal (1 cup)', calories: 150, notes: 'Slow-release carbs' },
        { name: 'Berries (1/2 cup)', calories: 40, notes: 'Antioxidants and natural sugars' },
        { name: 'Greek yogurt (1/2 cup)', calories: 65, notes: 'Protein for muscle support' },
      ],
    },
  ],
  postRun: [
    {
      name: 'Recovery Boost',
      time: 'Within 30 minutes',
      description: 'Optimal 4:1 carb to protein ratio to replenish glycogen stores and repair muscles.',
      foods: [
        { name: 'Chocolate milk (12oz)', calories: 220, notes: 'Perfect carb:protein ratio' },
        { name: 'Banana', calories: 105, notes: 'Potassium for preventing cramps' },
        { name: 'Trail mix (1/4 cup)', calories: 170, notes: 'Healthy fats and proteins' },
      ],
    },
    {
      name: 'Muscle Repair Meal',
      time: '1-2 hours post-run',
      description: 'Complete meal focusing on protein for muscle repair and complex carbs for glycogen replenishment.',
      foods: [
        { name: 'Grilled chicken (4oz)', calories: 180, notes: 'Lean protein for muscle repair' },
        { name: 'Sweet potato (medium)', calories: 100, notes: 'Complex carbs and vitamins' },
        { name: 'Steamed broccoli (1 cup)', calories: 55, notes: 'Antioxidants and fiber' },
        { name: 'Quinoa (1/2 cup)', calories: 110, notes: 'Complete protein and complex carbs' },
      ],
    },
  ],
  raceDay: [
    {
      name: 'Race Morning Fuel',
      time: '2-3 hours before race',
      description: 'Easy to digest, carb-focused meal that provides sustained energy without GI distress.',
      foods: [
        { name: 'Plain bagel', calories: 245, notes: 'Easy to digest carbs' },
        { name: 'Peanut butter (1 tbsp)', calories: 95, notes: 'Small amount of fat and protein' },
        { name: 'Banana', calories: 105, notes: 'Potassium and quick energy' },
        { name: 'Honey (1 tbsp)', calories: 60, notes: 'Quick energy boost' },
      ],
    },
    {
      name: 'Race Nutrition Plan',
      time: 'During race',
      description: 'Fueling strategy for races longer than 60 minutes to maintain energy levels.',
      foods: [
        { name: 'Energy gel', calories: 100, notes: 'Every 45 mins, with water' },
        { name: 'Sports drink (16oz)', calories: 100, notes: 'Every hour for electrolytes' },
        { name: 'Energy chews (4 pieces)', calories: 80, notes: 'Alternative to gels' },
      ],
    },
  ],
};

// Nutrition tips data
const nutritionTips = [
  {
    title: 'Carb Loading Strategy',
    description: 'For races longer than 90 minutes, gradually increase carb intake 2-3 days before the event. Aim for 8-10g of carbs per kg of body weight daily.',
    icon: <EmojiEventsIcon />,
  },
  {
    title: 'Daily Protein Needs',
    description: 'Runners need more protein than sedentary individuals. Aim for 1.4-1.6g of protein per kg of body weight daily to support muscle repair and growth.',
    icon: <FitnessCenterIcon />,
  },
  {
    title: 'Timing Matters',
    description: 'Consume a mix of protein and carbs within 30 minutes after your run to optimize recovery. This window is crucial for glycogen replenishment.',
    icon: <DirectionsRunIcon />,
  },
  {
    title: 'Hydration Tips',
    description: 'Drink 16oz of fluid 2 hours before running, and 4-6oz every 15-20 minutes during your run. Monitor urine color - aim for pale yellow.',
    icon: <LocalDrinkIcon />,
  },
];

function NutritionPage() {
  const [tabValue, setTabValue] = useState(0);
  const [waterIntake, setWaterIntake] = useState(4);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleWaterChange = (event, newValue) => {
    setWaterIntake(newValue);
  };

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Nutrition <span>& Hydration</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Optimize your performance with personalized nutrition plans, fueling strategies, and hydration tracking
        </PageSubtitle>
      </PageHeader>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Meal Planning" icon={<RestaurantIcon />} iconPosition="start" />
        <Tab label="Hydration" icon={<LocalDrinkIcon />} iconPosition="start" />
        <Tab label="Nutrition Tips" icon={<EmojiEventsIcon />} iconPosition="start" />
      </Tabs>

      {/* Meal Planning Tab */}
      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Meal Plans for Runners
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Proper nutrition before and after running helps optimize performance and recovery.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
            Pre-Run Nutrition
          </Typography>
          <Grid container spacing={3}>
            {mealPlans.preRun.map((meal, index) => (
              <Grid item xs={12} md={6} key={`pre-${index}`}>
                <StyledCard>
                  <MealTypeChip label={meal.time} color="primary" />
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {meal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {meal.description}
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography fontWeight={600}>Food</Typography></TableCell>
                            <TableCell align="right"><Typography fontWeight={600}>Calories</Typography></TableCell>
                            <TableCell><Typography fontWeight={600}>Notes</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meal.foods.map((food, foodIndex) => (
                            <TableRow key={`pre-${index}-food-${foodIndex}`}>
                              <TableCell>{food.name}</TableCell>
                              <TableCell align="right">{food.calories}</TableCell>
                              <TableCell>{food.notes}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ '& td': { fontWeight: 700 } }}>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">
                              {meal.foods.reduce((total, food) => total + food.calories, 0)}
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
            Post-Run Recovery
          </Typography>
          <Grid container spacing={3}>
            {mealPlans.postRun.map((meal, index) => (
              <Grid item xs={12} md={6} key={`post-${index}`}>
                <StyledCard>
                  <MealTypeChip label={meal.time} color="secondary" />
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {meal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {meal.description}
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography fontWeight={600}>Food</Typography></TableCell>
                            <TableCell align="right"><Typography fontWeight={600}>Calories</Typography></TableCell>
                            <TableCell><Typography fontWeight={600}>Notes</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meal.foods.map((food, foodIndex) => (
                            <TableRow key={`post-${index}-food-${foodIndex}`}>
                              <TableCell>{food.name}</TableCell>
                              <TableCell align="right">{food.calories}</TableCell>
                              <TableCell>{food.notes}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ '& td': { fontWeight: 700 } }}>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">
                              {meal.foods.reduce((total, food) => total + food.calories, 0)}
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
            Race Day Nutrition
          </Typography>
          <Grid container spacing={3}>
            {mealPlans.raceDay.map((meal, index) => (
              <Grid item xs={12} md={6} key={`race-${index}`}>
                <StyledCard>
                  <MealTypeChip label={meal.time} color="error" />
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {meal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {meal.description}
                    </Typography>
                    <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography fontWeight={600}>Food</Typography></TableCell>
                            <TableCell align="right"><Typography fontWeight={600}>Calories</Typography></TableCell>
                            <TableCell><Typography fontWeight={600}>Notes</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meal.foods.map((food, foodIndex) => (
                            <TableRow key={`race-${index}-food-${foodIndex}`}>
                              <TableCell>{food.name}</TableCell>
                              <TableCell align="right">{food.calories}</TableCell>
                              <TableCell>{food.notes}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ '& td': { fontWeight: 700 } }}>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">
                              {meal.foods.reduce((total, food) => total + food.calories, 0)}
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Hydration Tab */}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Hydration Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Stay properly hydrated to optimize your performance and recovery.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#3f95ea', mr: 2 }}>
                      <LocalDrinkIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight={700}>
                      Daily Water Intake
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Track your daily water consumption. Most runners need 2-3 liters per day, plus additional water to replace sweat loss.
                  </Typography>
                  <Box sx={{ px: 2, mt: 4 }}>
                    <WaterSlider
                      value={waterIntake}
                      onChange={handleWaterChange}
                      step={0.5}
                      marks
                      min={0}
                      max={8}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => `${value}L`}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">0L</Typography>
                      <Typography variant="body2" color="text.secondary">8L</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={800} color={
                      waterIntake < 2 ? '#f44336' : waterIntake >= 2 && waterIntake < 3 ? '#fb8c00' : '#4caf50'
                    }>
                      {waterIntake} Liters
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {waterIntake < 2 ? 'Drink more water! You\'re under-hydrated.' : 
                       waterIntake >= 2 && waterIntake < 3 ? 'You\'re adequately hydrated.' : 
                       'Great job! You\'re well-hydrated.'}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Hydration Guidelines
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Before Your Run
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Drink 16-20oz of water 2-3 hours before running<br />
                    • Drink 8-10oz of water 10-15 minutes before starting
                  </Typography>
                  
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    During Your Run
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • For runs under 60 minutes: Water is typically sufficient<br />
                    • For runs over 60 minutes: 4-6oz of sports drink every 15-20 minutes<br />
                    • Aim to replace 24-32oz of fluid per hour in hot conditions
                  </Typography>
                  
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    After Your Run
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Drink 16-24oz of fluid for every pound lost during exercise<br />
                    • Include sodium to help retain fluids and restore electrolyte balance<br />
                    • Monitor urine color - pale yellow indicates proper hydration
                  </Typography>
                  
                  <Box sx={{ bgcolor: 'rgba(63, 149, 234, 0.1)', p: 2, borderRadius: 2, mt: 2 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="primary" gutterBottom>
                      Signs of Dehydration:
                    </Typography>
                    <Typography variant="body2">
                      Thirst, dry mouth, fatigue, decreased performance, headache, dizziness, dark urine
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Nutrition Tips Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Runner's Nutrition Tips
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Essential nutritional advice to enhance your running performance and recovery.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {nutritionTips.map((tip, index) => (
              <Grid item xs={12} md={6} key={index}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {tip.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>
                        {tip.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {tip.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
            Nutrient Timing for Runners
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}><Typography fontWeight={700}>Timing</Typography></TableCell>
                  <TableCell sx={{ color: 'white' }}><Typography fontWeight={700}>Focus</Typography></TableCell>
                  <TableCell sx={{ color: 'white' }}><Typography fontWeight={700}>Recommendations</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Daily Nutrition</Typography></TableCell>
                  <TableCell>Fueling & Recovery</TableCell>
                  <TableCell>
                    55-65% carbs, 15-20% protein, 20-30% healthy fats. Prioritize whole foods, fruits, vegetables, lean proteins.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Pre-Run (3-4 hours)</Typography></TableCell>
                  <TableCell>Fueling</TableCell>
                  <TableCell>
                    Balanced meal with complex carbs, moderate protein, low fat and fiber (300-600 calories).
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Pre-Run (30-60 min)</Typography></TableCell>
                  <TableCell>Quick Energy</TableCell>
                  <TableCell>
                    Small snack, mainly simple carbs (100-200 calories) like banana or energy bar.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>During Run (&lt;60 min)</Typography></TableCell>
                  <TableCell>Hydration</TableCell>
                  <TableCell>
                    Water is usually sufficient unless in extreme heat.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>During Run (&gt;60 min)</Typography></TableCell>
                  <TableCell>Sustained Energy</TableCell>
                  <TableCell>
                    30-60g carbs per hour from sports drinks, gels, or chews.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Post-Run (0-30 min)</Typography></TableCell>
                  <TableCell>Recovery Window</TableCell>
                  <TableCell>
                    4:1 carb to protein ratio (15-25g protein, 60-100g carbs).
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Post-Run (1-2 hours)</Typography></TableCell>
                  <TableCell>Muscle Repair</TableCell>
                  <TableCell>
                    Complete meal with quality protein, complex carbs, vegetables, and healthy fats.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default NutritionPage; 