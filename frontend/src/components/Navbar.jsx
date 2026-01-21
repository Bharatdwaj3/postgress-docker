import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem,
  Tooltip, Avatar, InputBase, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUser, clearUser } from '../store/avatarSlice';
import api from '../util/api';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.avatar);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);  

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      dispatch(clearUser());
      handleClose();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getInitial = (name) => name ? name[0].toUpperCase() : 'U';

  if (loading) {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: '#0f1418' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <CircularProgress size={24} sx={{ color: '#20b2a6' }} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0f1418',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(32,178,166,0.12)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 80 }, px: { xs: 2, md: 5 } }}>
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(90deg, #20b2a6, #1de9b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            mr: 6,
          }}
        >
          Augen
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, flexGrow: 1 }}>
          <Link to="/explore" style={{ color: 'white', textDecoration: 'none' }}>Explore</Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              backgroundColor: '#1a2329',
              borderRadius: '12px',
              px: 2,
              py: 0.6,
              border: '1px solid #242b32',
            }}
          >
            <SearchIcon sx={{ color: '#7a8491', mr: 1.5 }} />
            <InputBase
              placeholder="Search contents..."
              sx={{ color: 'white', width: { sm: 160, md: 220 } }}
            />
          </Box>

          {user ? (
            <>
              <Tooltip title={user.userName || 'Account'}>
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#20b2a6', fontWeight: 700 }}>
                    {getInitial(user.userName)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: { mt: 1.5, backgroundColor: '#1a2329', color: 'white', minWidth: 200 }
                }}
              >
                <MenuItem component={Link} to={`/${user.accountType}`} onClick={handleClose}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#ff6b6b' }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link to="/login" style={{ color: 'white' }}>Log in</Link>
              <Link to="/signup" style={{ color: '#20b2a6', fontWeight: 700 }}>Sign up</Link>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;