import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/profile'); // Redirect to profile page upon successful login
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Don't have an account? <a href="/register" className="text-indigo-500">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
