import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person, Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../util/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    accountType: 'reader',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) return setError('Please agree to terms');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');

    setLoading(true);

    try {
      await api.post('/user/register', formData);
      navigate('/login', { state: { message: 'Account created! Check your email.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-surface/80 backdrop-blur rounded-2xl shadow-2xl border border-border">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Person className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl"
            />
          </div>

          <div className="relative">
            <Person className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">I want to be a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'accountType', value: 'reader' } })}
                className={`p-3 rounded-xl border ${formData.accountType === 'reader' ? 'border-teal-500 bg-teal-500/10' : 'border-gray-600'}`}
              >
                Reader
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'accountType', value: 'writer' } })}
                className={`p-3 rounded-xl border ${formData.accountType === 'writer' ? 'border-teal-500 bg-teal-500/10' : 'border-gray-600'}`}
              >
                Creator
              </button>
            </div>
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
              className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 text-teal-500"
            />
            <label className="ml-2 text-sm text-muted-foreground">
              I agree to the <span className="text-teal-400">Terms</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}