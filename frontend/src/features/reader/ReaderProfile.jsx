import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Person, Email, Cake, Today, CheckCircle, Cancel, Edit,
} from "@mui/icons-material";
import {
  Box, CircularProgress, Avatar, Button,
  Typography, Divider, Chip, Grid, Paper,
  Tabs, Tab,
} from "@mui/material";
import api from "../../util/api";

const ReaderProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.avatar);
  const [reader, setReader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchReader = async () => {
      try {
        setLoading(true);

        if (user) {
          setReader(user);
          setLoading(false);
          return;
        }

        const { data } = await api.get("/user/reader/");
        console.log("API Response:", data);
        setReader(data);
        setLoading(false);
      } catch (e) {
        console.error("Reader profile error:", e);
        setError(e.response?.data?.message || "Failed to load your profile");
        setLoading(false);

        if (e.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchReader();
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

  if (!reader) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography>No profile data available</Typography>
      </Box>
    );
  }

  const username =
    reader.userName?.toLowerCase().replace(/\s+/g, "_") ||
    reader.fullName?.toLowerCase().replace(/\s+/g, "_") ||
    "reader";

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date",e;
    }
  };

  const OverviewPanel = () => (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Avatar
            src={reader.avatar}
            sx={{ width: 100, height: 100 }}
            className="border-4 border-white shadow-lg"
          >
            {reader.fullName?.[0]?.toUpperCase() ||
              reader.userName?.[0]?.toUpperCase() ||
              "R"}
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-white">@{username}</h1>
            <p className="flex items-center gap-2 text-gray-300 mt-1">
              <Person fontSize="small" /> {reader.fullName}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <Email fontSize="small" /> {reader.email}
            </p>
          </div>
        </div>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => navigate("/reader/edit")}
          sx={{ borderColor: "#8b5cf6", color: "#8b5cf6" }}
        >
          Edit Profile
        </Button>
      </div>

     
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Cake className="w-10 h-10 text-amber-600" />
              <div>
                <Typography variant="h6" className="font-bold text-gray-900">
                  {formatDate(reader.createdAt)}
                </Typography>
                <Typography variant="body2" className="text-amber-600">
                  Member Since
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Today className="w-10 h-10 text-blue-600" />
              <div>
                <Typography variant="h6" className="font-bold text-gray-900">
                  {formatDate(reader.lastLogin)}
                </Typography>
                <Typography variant="body2" className="text-blue-600">
                  Last Login
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="flex items-center gap-3">
              {reader.isActive ? (
                <CheckCircle className="w-10 h-10 text-purple-600" />
              ) : (
                <Cancel className="w-10 h-10 text-purple-600" />
              )}
              <div>
                <Typography variant="h6" className="font-bold text-gray-900">
                  {reader.isActive ? "Active" : "Inactive"}
                </Typography>
                <Typography variant="body2" className="text-purple-600">
                  Account Status
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>

     
      <div className="flex items-center gap-3">
        <Person className="w-7 h-7 text-indigo-600" />
        <Typography variant="h4" className="font-bold text-white">
          {reader.fullName || "Reader Profile"}
        </Typography>
        <Chip
          label={reader.accountType?.charAt(0).toUpperCase() + reader.accountType?.slice(1)}
          color="primary"
        />
        {reader.isActive ? (
          <Chip icon={<CheckCircle />} label="Active" color="success" />
        ) : (
          <Chip icon={<Cancel />} label="Inactive" color="error" />
        )}
      </div>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
            <Person className="w-5 h-5 text-teal-600" /> Username
          </Typography>
          <Typography className="text-gray-300 pl-7 font-mono">
            @{username}
          </Typography>
        </div>

        <div className="space-y-2">
          <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
            <Email className="w-5 h-5 text-purple-600" /> Email Address
          </Typography>
          <Typography className="text-gray-300 pl-7 break-all">
            {reader.email}
          </Typography>
        </div>

        <div className="space-y-2">
          <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
            <Cake className="w-5 h-5 text-amber-600" /> Profile Created
          </Typography>
          <Typography className="text-gray-300 pl-7">
            {formatDate(reader.createdAt)}
          </Typography>
        </div>

        <div className="space-y-2">
          <Typography variant="h6" className="flex items-center gap-2 font-semibold text-gray-300">
            <Today className="w-5 h-5 text-blue-600" /> Last Updated
          </Typography>
          <Typography className="text-gray-300 pl-7">
            {formatDate(reader.updatedAt)}
          </Typography>
        </div>
      </div>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
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
              "&.Mui-selected": { color: "#8b5cf6" },
            },
          }}
        >
          <Tab label="Overview" />
        </Tabs>
      </Box>

      <Box className="p-6 md:p-12 max-w-7xl mx-auto">
        {tab === 0 && <OverviewPanel />}
      </Box>
    </div>
  );
};

export default ReaderProfile;