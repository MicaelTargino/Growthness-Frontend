// src/pages/PasswordResetConfirm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();  // Get uid and token from URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post(`password-reset-confirm/`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
        uid: uid,
        token: token
      });
      setMessage('Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000);  // Redirect to login page after a delay
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
