import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/avatarSlice';
import { Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../util/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/user/login', formData);
      
      const userData = await dispatch(fetchUser()).unwrap();
      if (userData.accountType === 'reader') {
        navigate('/reader');
      } else if (userData.accountType === 'creator') {
        navigate('/creator');
      } else {
       
        navigate('/');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-surface/80 backdrop-blur rounded-2xl shadow-2xl border border-border">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        {successMessage && (
          <div className="bg-teal-400/10 border border-teal-400/50 rounded-lg p-3 mb-4">
            <p className="text-teal-400 text-sm text-center">{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-400/10 border border-rose-400/50 rounded-lg p-3 mb-4">
            <p className="text-rose-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-xl text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}