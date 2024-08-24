import React, { useState } from 'react';
import { registerUser } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="password2" name="password" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
