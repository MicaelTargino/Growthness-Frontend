// src/pages/PasswordResetConfirm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import NavHeader from '../components/NavHeader';
import { ToastContainer } from 'react-toastify';
import { notify } from '../services/toastService';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();  // Get uid and token from URL parameters
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonInnerHtml, setButtonInnerHTML] = useState('Redefinir senha');

  const [formData, setFormData] = useState({ email: '', password: '', password2: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (buttonInnerHtml != 'Redefinir senha') return;

    setMessage('');
    setError('');
    setButtonInnerHTML(
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    );

    if (formData.password !== formData.password2) {
      // setError("Passwords do not match.");
      notify('error', 'Suas senhas não coincidem', 'bottom-right');
      setButtonInnerHTML("Redefinir senha")
      return;
    }

    try {
      const response = await axiosInstance.post(`/auth/password-reset-confirm/`, {
        new_password: formData.password,
        confirm_password: formData.password2,
        uid: uid,
        token: token
      });
      notify('success', 'Senha redefinida com sucesso!', 'bottom-right');
      setButtonInnerHTML("Concluido!")
      setTimeout(() => navigate('/login'), 3000);  // Redirect to login page after a delay
    } catch (error) {
      setButtonInnerHTML("Redefinir senha")
      notify('error', 'Falha ao redefinir senha', 'bottom-right');
    }
  };

  return (
    <section className='w-[100vw] h-screen bg-slate-200 relative flex items-center justify-center'>
        <NavHeader />
        <form onSubmit={handleSubmit} className="w-full max-w-[550px] lg:w-[650px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start">
          <div className="w-full max-w-[550px] lg:max-w-full lg:w-[650px] rounded-lg shadow-md py-6 px-4 xl:px-16 bg-slate-50 flex flex-col justify-center relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Redefinir senha</h2>
            <div className='w-[100%] h-[1px] bg-gray-300'></div>
              <div className="flex flex-col">
                <p className="text-slate-600 mt-2 mb-4">Digite sua nova senha.</p>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Senha" />
                <input type="password" name="password2" value={formData.password2} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Confirme sua Senha" />
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                  {buttonInnerHtml}
                </button>
              </div>
          </div>
        </form>
        <ToastContainer />
    </section>
  );
};

export default PasswordResetConfirm;
