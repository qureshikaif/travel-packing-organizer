// src/components/SignupPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
