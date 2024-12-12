// src/components/SignupPage.js

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

import Background from '../assets/side.jpg'; // Ensure the path is correct

const SignupPage = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate signup logic
    if (username && email && password) {
      // In a real app, you'd send this data to the backend to create a new user
      const userData = {
        username,
        email
      };
      login(userData); // Automatically log in the user after signup
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
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

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Your username"
              />
            </div>
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
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
