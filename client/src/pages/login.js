// src/components/LoginPage.js

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

import Background from '../assets/side.jpg'; // Ensure the path is correct

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate authentication logic
    if (email && password) {
      // Mock user data
      const userData = {
        username: email.split('@')[0],
        email
      };
      login(userData);
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 relative h-screen">
          <img
            src={Background}
            alt="Travel Gear"
            className="w-full h-full object-cover"
          />
          {/* Optional Black Overlay on Image */}
          <div className="absolute inset-0 bg-black opacity-25"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-800 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
