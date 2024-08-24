// src/pages/PasswordResetRequest.js
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axiosInstance.post('/password-reset-request/', { email });
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setError('Failed to send password reset email. Please check if the email is correct.');
    }
  };

  return (
    <div>
      <h1>Request Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordResetRequest;
