/* eslint-disable react-hooks/static-components */
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarToday,
  People,
  Article,
  Edit,
} from "@mui/icons-material";
import {
  Box, CircularProgress, Avatar, Button,
  Typography, Divider, Chip, Grid, Paper,
  Tabs, Tab,
} from "@mui/material";
import api from "../../util/api";

const ContentTab = lazy(() => import("../content/ContentTab.jsx"));

const WriterProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.avatar);
  const [writer, setWriter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        setLoading(true);

        if (user) {
          setWriter(user);
          setLoading(false);
          return;
        }

        const { data } = await api.get('/user/writer/profile');
        setWriter(data);
        setLoading(false);
        
      } catch (e) {
        console.error('Writer profile error:', e);
        setError(e.response?.data?.message || "Failed to load your profile");
        setLoading(false);
        
        if (e.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchWriter();
  }, [navigate, user]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-screen p-4">
        <Box className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md w-full text-center">
          {error}
        </Box>
      </Box>
    );
  }

  if (!writer) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography>No profile data available</Typography>
      </Box>
    );
  }

  const username = writer.storeName?.toLowerCase().replace(/\s+/g, "_") || 
                   writer.userName?.toLowerCase().replace(/\s+/g, "_") || 
                   "creator";

const OverviewPanel = () => (
  <div className="space-y-12">

    {/* Header – avatar + handle + name + joined */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-10">
      <Avatar 
        src={writer.user?.imageUrl || writer.mediaUrl || ''} 
        sx={{ width: { xs: 100, md: 140 }, height: { xs: 100, md: 140 } }}
        className="border-4 border-gray-700 shadow-xl"
      >
        {(writer.user?.fullName?.[0] || writer.user?.username?.[0] || 'C').toUpperCase()}
      </Avatar>

      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          @{writer.user?.username || writer.userName || 'creator'}
        </h1>
        
        <p className="text-xl text-gray-300 mt-2">
          {writer.user?.fullName || 'Fill plz (full name)'}
        </p>

        <p className="text-gray-400 mt-3 flex items-center justify-center md:justify-start gap-2">
          <CalendarToday fontSize="small" />
          Joined {writer.createdAt 
            ? new Date(writer.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'Fill plz (join date)'}
        </p>

        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => navigate("/creator/edit")}
          sx={{
            mt: 3,
            borderColor: '#8b5cf6',
            color: '#8b5cf6',
            '&:hover': { bgcolor: 'rgba(139,92,246,0.08)' }
          }}
        >
          Edit Profile
        </Button>
      </div>
    </div>

    {/* Quick stats */}
    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 mb-10">
      <Chip
        icon={<Article fontSize="small" />}
        label={`${writer.authored?.length || 0} Contents`}
        variant="outlined"
        sx={{ bgcolor: 'rgba(139,92,246,0.1)', borderColor: '#8b5cf6', color: '#d1d5db' }}
      />
      <Chip
        icon={<People fontSize="small" />}
        label={`${writer.followers?.length || 0} Followers`}
        variant="outlined"
        sx={{ bgcolor: 'rgba(139,92,246,0.1)', borderColor: '#8b5cf6', color: '#d1d5db' }}
      />
      <Chip
        icon={<People fontSize="small" />}
        label={`${writer.following?.length || 0} Following`}
        variant="outlined"
        sx={{ bgcolor: 'rgba(139,92,246,0.1)', borderColor: '#8b5cf6', color: '#d1d5db' }}
      />
    </div>

    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.08)', my: 6 }} />

    {/* Bio */}
    <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800">
      <Typography variant="h5" className="font-bold mb-4 text-white">Bio</Typography>
      <Typography className="text-gray-300 leading-relaxed whitespace-pre-line">
        {writer.bio || 'Fill plz (tell readers about yourself)'}
      </Typography>
    </div>

    {/* Interests */}
    <div className="mt-10">
      <Typography variant="h6" className="font-semibold mb-4 text-gray-200">Interests</Typography>
      {writer.intrests?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {writer.intrests.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              variant="outlined"
              sx={{ borderColor: '#8b5cf6', color: '#c4b5fd' }}
            />
          ))}
        </div>
      ) : (
        <Typography className="text-gray-500 italic">
          Fill plz (add your interests: fiction, science, art, daily)
        </Typography>
      )}
    </div>

    {/* Profile Media / Cover (if you want to show it separately) */}
    <div className="mt-10">
      <Typography variant="h6" className="font-semibold mb-4 text-gray-200">Profile Media</Typography>
      {writer.mediaUrl ? (
        <img 
          src={writer.mediaUrl} 
          alt="Profile media" 
          className="max-w-full h-auto rounded-xl border border-gray-700 shadow-md"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      ) : (
        <Typography className="text-gray-500 italic">
          Fill plz (upload profile picture or banner)
        </Typography>
      )}
    </div>

    {/* Recent Content Preview */}
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="font-bold text-white">Recent Content</Typography>
        <Button 
          variant="text" 
          sx={{ color: '#8b5cf6', textTransform: 'none' }}
          onClick={() => setTab(1)}
        >
          View all →
        </Button>
      </div>

      {writer.authored?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(writer.authored || []).slice(0, 3).map((item, idx) => (
            <Paper 
              key={idx}
              elevation={0}
              className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-600/50 transition-all"
            >
              <Typography variant="h6" className="text-white mb-2 line-clamp-2">
                {item.title || `Content #${idx + 1}`}
              </Typography>
              <Typography variant="body2" className="text-gray-400 line-clamp-3">
                {item.description || 'No description available'}
              </Typography>
            </Paper>
          ))}
        </div>
      ) : (
        <Typography className="text-center text-gray-500 py-12">
          Fill plz – you haven't published any content yet
        </Typography>
      )}
    </div>

  </div>
);
  return (
    <div className="w-screen bg-gradient-to-br from-gray-900 to-black min-h-screen text-white pt-20">
      <Box className="border-b border-gray-700 sticky top-16 bg-gray-900 z-10">
        <Tabs 
          value={tab} 
          onChange={(_, v) => setTab(v)} 
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#8b5cf6", height: 3 },
            "& .MuiTab-root": { 
              textTransform: "none", 
              fontWeight: 600, 
              color: "#9ca3af", 
              "&.Mui-selected": { color: "#8b5cf6" } 
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Content" />
        </Tabs>
      </Box>

      <Box className="p-6 md:p-12 max-w-7xl mx-auto">
        {tab === 0 && <OverviewPanel />}
        {tab === 1 && (
          <Suspense 
            fallback={
              <Box className="flex justify-center py-16">
                <CircularProgress sx={{ color: "#8b5cf6" }} />
              </Box>
            }
          >
            <ContentTab /> 
          </Suspense>
        )}
      </Box>
    </div>
  );
};

export default WriterProfile;