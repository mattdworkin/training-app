import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Chip,
  Paper,
  LinearProgress,
  Divider,
  Avatar,
  Fade,
  styled,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShareIcon from '@mui/icons-material/Share';

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

const QuoteCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundImage: 'linear-gradient(135deg, rgba(255, 107, 149, 0.08) 0%, rgba(255, 107, 149, 0.03) 100%)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/pattern.svg")',
    backgroundSize: 'cover',
    opacity: 0.03,
    zIndex: 0,
  },
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  fontWeight: 500,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));

const QuoteAuthor = styled(Typography)(({ theme }) => ({
  textAlign: 'right',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginTop: 'auto',
  position: 'relative',
  zIndex: 1,
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  left: theme.spacing(3),
  fontSize: '3rem',
  color: theme.palette.primary.main,
  opacity: 0.2,
  transform: 'rotate(180deg)',
  zIndex: 0,
}));

const ExerciseCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
  },
}));

const ExerciseHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: 'linear-gradient(135deg, #FF6B95 0%, #FF8FAF 100%)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
}));

const ExerciseAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginRight: theme.spacing(2),
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  marginBottom: theme.spacing(2),
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 107, 149, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AudioControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const TimerText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));

const BookmarkButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.primary.main,
}));

// Motivational quotes data
const motivationalQuotes = [
  {
    quote: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
    author: "John Bingham",
  },
  {
    quote: "Running is the greatest metaphor for life, because you get out of it what you put into it.",
    author: "Oprah Winfrey",
  },
  {
    quote: "I always loved running... it was something you could do by yourself, and under your own power. You could go in any direction, fast or slow as you wanted, fighting the wind if you felt like it, seeking out new sights just on the strength of your feet and the courage of your lungs.",
    author: "Jesse Owens",
  },
  {
    quote: "That's the thing about running: your greatest runs are rarely measured by racing success. They are moments in time when running allows you to see how wonderful your life is.",
    author: "Kara Goucher",
  },
  {
    quote: "The pain of running relieves the pain of living.",
    author: "Jacqueline Simon Gunn",
  },
  {
    quote: "If you want to become the best runner you can be, start now. Don't spend the rest of your life wondering if you can do it.",
    author: "Priscilla Welch",
  },
  {
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    quote: "Mental will is a muscle that needs exercise, just like the muscles of the body.",
    author: "Lynn Jennings",
  },
];

// Mental training exercises data
const mentalExercises = [
  {
    title: "Race Visualization",
    description: "Mentally rehearse your upcoming race, visualizing success and positive outcomes.",
    icon: <EmojiEventsIcon />,
    duration: "10 min",
    progress: 0,
  },
  {
    title: "Confidence Building",
    description: "Develop race-day confidence with affirmations and self-belief exercises.",
    icon: <PsychologyIcon />,
    duration: "8 min",
    progress: 0,
  },
  {
    title: "Pre-Race Calm",
    description: "Reduce anxiety and center yourself with breathing techniques and mindfulness.",
    icon: <SelfImprovementIcon />,
    duration: "5 min",
    progress: 0,
  },
  {
    title: "Goal Setting Workshop",
    description: "Create SMART goals for your running journey and break them into actionable steps.",
    icon: <MenuBookIcon />,
    duration: "15 min",
    progress: 0,
  },
];

// Race mantra suggestions
const mantraSuggestions = [
  "Strong and steady",
  "I can do hard things",
  "One mile at a time",
  "Find your strong",
  "Dig deep",
  "Focus forward",
  "Trust your training",
  "Present moment",
  "Embrace the pace",
];

function MentalPage() {
  const [shuffledQuotes, setShuffledQuotes] = useState([]);
  const [playingExercise, setPlayingExercise] = useState(null);
  const [savedMantras, setSavedMantras] = useState([]);
  const [customMantra, setCustomMantra] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState([]);

  // Shuffle quotes for random display
  useEffect(() => {
    const shuffled = [...motivationalQuotes].sort(() => 0.5 - Math.random());
    setShuffledQuotes(shuffled.slice(0, 4));
  }, []);

  // Handle play button click
  const handlePlayExercise = (index) => {
    if (playingExercise === index) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingExercise(index);
      setIsPlaying(true);
      setElapsedTime(0);
      
      // Parse duration string to get seconds
      const durationStr = mentalExercises[index].duration;
      const minutes = parseInt(durationStr.split(' ')[0]);
      setTotalTime(minutes * 60);
    }
  };

  // Simulate progress for playing exercise
  useEffect(() => {
    let timer;
    if (isPlaying && playingExercise !== null) {
      timer = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            clearInterval(timer);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playingExercise, totalTime]);

  // Add custom mantra
  const handleAddMantra = () => {
    if (customMantra.trim() !== '') {
      setSavedMantras([...savedMantras, customMantra.trim()]);
      setCustomMantra('');
    }
  };

  // Toggle quote bookmark
  const toggleBookmark = (index) => {
    if (bookmarkedQuotes.includes(index)) {
      setBookmarkedQuotes(bookmarkedQuotes.filter((i) => i !== index));
    } else {
      setBookmarkedQuotes([...bookmarkedQuotes, index]);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Mental <span>Training Center</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Strengthen your mental game with visualization exercises, motivational content, and race-day psychology techniques
        </PageSubtitle>
      </PageHeader>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Daily Motivation
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Powerful quotes to inspire your running journey and keep you motivated through challenges.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {shuffledQuotes.map((quote, index) => (
          <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
            <Grid item xs={12} sm={6} md={3}>
              <QuoteCard elevation={1}>
                <QuoteIcon />
                <QuoteText variant="body1">
                  "{quote.quote}"
                </QuoteText>
                <QuoteAuthor variant="subtitle1">
                  — {quote.author}
                </QuoteAuthor>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleBookmark(index)}
                    color="primary"
                  >
                    {bookmarkedQuotes.includes(index) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </QuoteCard>
            </Grid>
          </Fade>
        ))}
      </Grid>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Mental Training Exercises
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Audio-guided exercises to build mental strength, boost confidence, and prepare for race day.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {mentalExercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ExerciseCard>
              <ExerciseHeader>
                <ExerciseAvatar>{exercise.icon}</ExerciseAvatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {exercise.title}
                  </Typography>
                  <Typography variant="body2">
                    {exercise.duration} audio session
                  </Typography>
                </Box>
              </ExerciseHeader>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" paragraph>
                  {exercise.description}
                </Typography>
                
                {playingExercise === index && (
                  <ProgressContainer>
                    <ProgressBar 
                      variant="determinate" 
                      value={(elapsedTime / totalTime) * 100} 
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(elapsedTime)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {exercise.duration}
                      </Typography>
                    </Box>
                  </ProgressContainer>
                )}
                
                <AudioControls>
                  <PlayButton onClick={() => handlePlayExercise(index)}>
                    {playingExercise === index && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                  </PlayButton>
                  <TimerText variant="body2">
                    {playingExercise === index ? formatTime(elapsedTime) : exercise.duration}
                  </TimerText>
                  <BookmarkButton>
                    <BookmarkBorderIcon fontSize="small" />
                  </BookmarkButton>
                </AudioControls>
              </CardContent>
            </ExerciseCard>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Race Day Mantras
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Create powerful race day mantras to repeat during difficult moments of your runs or races.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Create Your Mantra
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              A good mantra should be short, positive, and meaningful to you. Repeat it during challenging moments in your training and races.
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your personal mantra..."
                value={customMantra}
                onChange={(e) => setCustomMantra(e.target.value)}
                size="small"
              />
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ ml: 1 }}
                onClick={handleAddMantra}
              >
                Add
              </Button>
            </Box>
            
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Suggestions:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {mantraSuggestions.map((mantra, index) => (
                <Chip 
                  key={index} 
                  label={mantra} 
                  onClick={() => setCustomMantra(mantra)}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Your Saved Mantras:
            </Typography>
            {savedMantras.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {savedMantras.map((mantra, index) => (
                  <Chip 
                    key={index} 
                    label={mantra} 
                    color="primary"
                    onDelete={() => setSavedMantras(savedMantras.filter((_, i) => i !== index))}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No saved mantras yet. Add some above!
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Race Day Mental Strategies
            </Typography>
            
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Break the Race Into Chunks</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Instead of thinking about the entire distance, break your race into smaller, more manageable segments. Focus on reaching the next mile marker, water station, or landmark. This makes the race feel less overwhelming.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Embrace Discomfort</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Accept that racing involves discomfort. Instead of fighting against it, acknowledge it as a natural part of pushing your limits. Remind yourself that the discomfort is temporary and serves a purpose in helping you reach your goals.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Positive Self-Talk</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Pay attention to your inner dialogue during a race. Replace negative thoughts with positive, encouraging statements. Talk to yourself as you would to a friend who needs encouragement. This can significantly impact your performance and experience.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Mindfulness and Presence</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Practice staying in the present moment. Focus on your breathing, form, and immediate surroundings rather than worrying about how much distance remains or how you'll feel later in the race. This helps manage anxiety and maintains energy.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Visualization Techniques</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Visualize yourself successfully completing difficult sections of the course. Picture yourself running with good form, feeling strong, and crossing the finish line. This mental rehearsal helps prepare your mind for the actual experience.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MentalPage; 
