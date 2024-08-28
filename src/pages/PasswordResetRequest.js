// src/pages/PasswordResetRequest.js
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { registerUser, loginUser } from '../services/authService';
import FullLogo from '../components/FullLogo';
import { useNavigate } from 'react-router-dom';
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';
import NavHeader from '../components/NavHeader';
import BtnWithLoading from '../components/BtnWithLoading';


const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonInnerHtml, setButtonInnerHTML] = useState('Enviar Email');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setButtonInnerHTML(
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    );

    try {
      const response = await axiosInstance.post('/password-reset-request/', { email });
      setMessage('Password reset link has been sent to your email.');
      setButtonInnerHTML("Enviado!");
      notify('success', "Email enviado com sucesso!", 'bottom-right');
    } catch (error) {
      setError('Failed to send password reset email. Please check if the email is correct.');
    }
  };

  return (
    // <div>
    //   <h1>Request Password Reset</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Enter your email"
    //       value={email}
    //       onChange={handleChange}
    //       required
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    //   {message && <p style={{ color: 'green' }}>{message}</p>}
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>
    <section className='w-[100vw] h-screen bg-slate-200 relative flex items-center justify-center'>
        <NavHeader />
        <form onSubmit={handleSubmit} className="w-full max-w-[550px] lg:w-[650px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start">
          <div className="w-full max-w-[550px] lg:max-w-full lg:w-[650px] rounded-lg shadow-md py-6 px-4 xl:px-16 bg-slate-50 flex flex-col justify-center relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Redefinir senha</h2>
            <div className='w-[100%] h-[1px] bg-gray-300'></div>
              <div className="flex flex-col">
                <p className="text-slate-600 mt-2 mb-4">Enviaremos um link para o seu email para você redefinir sua senha.</p>
                <input type="email" name="email" value={email} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email" />
                {/* <BtnWithLoading defaultInnerElement={<span>Enviar email</span>} afterInnerElement={<span>Sent!</span>} actionCallback={} /> */}
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

export default PasswordResetRequest;
