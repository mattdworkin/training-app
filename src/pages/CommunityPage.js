import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 107, 149, 0.1)',
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ActivityFeed = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const PostCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 999,
  paddingInline: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

// Placeholder data
const upcomingEvents = [
  {
    title: "Saturday Morning Group Run",
    location: "Central Park, NYC",
    time: "Sat, 8:00 AM",
    participants: 12,
  },
  {
    title: "Beginners Trail Run",
    location: "Prospect Park, Brooklyn",
    time: "Sun, 9:00 AM",
    participants: 8,
  },
  {
    title: "Marathon Training Group",
    location: "East River Track",
    time: "Wed, 6:30 PM",
    participants: 15,
  },
];

const suggestedGroups = [
  {
    name: "NYC Marathon Runners",
    members: 1245,
    description: "For runners training for the NYC Marathon",
  },
  {
    name: "Morning Trail Runners",
    members: 567,
    description: "Early morning trail running enthusiasts",
  },
  {
    name: "Brooklyn Running Club",
    members: 892,
    description: "Runners of all levels in Brooklyn",
  },
];

const activityFeed = [
  {
    user: "Sarah Johnson",
    initials: "SJ",
    avatarColor: "#ff5f7f",
    action: "completed a 10K run",
    time: "2 hours ago",
    details: "Finished my longest run this week! Feeling great about my progress toward the half marathon.",
    likes: 24,
    comments: 5,
  },
  {
    user: "Michael Chen",
    initials: "MC",
    avatarColor: "#11a4a5",
    action: "joined Marathon Training Group",
    time: "5 hours ago",
    details: "Excited to start training with this group for my first full marathon!",
    likes: 18,
    comments: 3,
  },
  {
    user: "Alicia Rodriguez",
    initials: "AR",
    avatarColor: "#f5a524",
    action: "shared a new route",
    time: "Yesterday",
    details: "Found this amazing 5-mile route with great views and minimal traffic. Perfect for an easy recovery run!",
    likes: 42,
    comments: 8,
  },
];

function CommunityPage() {
  return (
    <Box>
      <PageHeader>
        <PageTitle variant="h3">
          Runner's <span>Community</span>
        </PageTitle>
        <PageSubtitle variant="h6">
          Connect with other runners, join local groups, share your achievements, and participate in community events
        </PageSubtitle>
      </PageHeader>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Community Features
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore ways to connect with fellow runners and enhance your running experience.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox elevation={0}>
            <FeatureIcon>
              <GroupsIcon color="primary" fontSize="large" />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Running Groups
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join local running groups matching your pace, schedule, and goals.
            </Typography>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox elevation={0}>
            <FeatureIcon>
              <EventIcon color="primary" fontSize="large" />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Group Runs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Participate in organized group runs in your area with runners at your level.
            </Typography>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox elevation={0}>
            <FeatureIcon>
              <EmojiEventsIcon color="primary" fontSize="large" />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Challenges
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join monthly challenges to stay motivated and connect with other participants.
            </Typography>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureBox elevation={0}>
            <FeatureIcon>
              <ForumIcon color="primary" fontSize="large" />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Forums
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discuss training, gear, nutrition, and recovery with the community.
            </Typography>
          </FeatureBox>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Community Activity
          </Typography>
          <ActivityFeed elevation={0}>
            {activityFeed.map((activity, index) => (
              <React.Fragment key={index}>
                <PostCard elevation={0}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: activity.avatarColor,
                        fontWeight: 700,
                      }}
                    >
                      {activity.initials}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {activity.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.action} • {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {activity.details}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ActionButton startIcon={<ThumbUpIcon />}>
                      Like ({activity.likes})
                    </ActionButton>
                    <ActionButton startIcon={<ChatIcon />}>
                      Comment ({activity.comments})
                    </ActionButton>
                    <ActionButton startIcon={<ShareIcon />}>
                      Share
                    </ActionButton>
                  </Box>
                </PostCard>
              </React.Fragment>
            ))}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="outlined" color="primary">
                Load More
              </Button>
            </Box>
          </ActivityFeed>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Upcoming Events
          </Typography>
          <StyledCard>
            <CardContent>
              <List sx={{ width: '100%' }}>
                {upcomingEvents.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={700}>
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {event.time}
                            </Typography>
                            {` — ${event.location}`}
                            <Box sx={{ mt: 1 }}>
                              <Badge
                                badgeContent={event.participants}
                                color="primary"
                                sx={{ mr: 1 }}
                              >
                                <GroupsIcon color="action" fontSize="small" />
                              </Badge>
                              <Button size="small" variant="outlined" color="primary">
                                Join
                              </Button>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < upcomingEvents.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<EventIcon />}>
                  View All Events
                </Button>
              </Box>
            </CardContent>
          </StyledCard>

          <Typography variant="h5" fontWeight={700} sx={{ mt: 4 }} gutterBottom>
            Suggested Running Groups
          </Typography>
          <StyledCard>
            <CardContent>
              <List sx={{ width: '100%' }}>
                {suggestedGroups.map((group, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <GroupsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={700}>
                            {group.name}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {group.members} members
                            </Typography>
                            {` — ${group.description}`}
                            <Box sx={{ mt: 1 }}>
                              <Button size="small" variant="outlined" color="primary" startIcon={<PersonAddIcon />}>
                                Join Group
                              </Button>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < suggestedGroups.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<GroupsIcon />}>
                  Explore All Groups
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CommunityPage; 
