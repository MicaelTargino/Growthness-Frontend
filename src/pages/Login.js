import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { HeartHandshake } from 'lucide-react';
import FullLogo from '../components/FullLogo';
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';
import { GoogleLoginBtn } from '../components/GoogleLogin';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length === 0 || formData.password.length === 0) {
      notify('error', 'Preencha todos os campos.', 'bottom-right');
      return;
    }

    try {
      await loginUser(formData);  
      navigate('/demo')    

    } catch (error) {
      try {
        notify('error', error.response.data.message, 'bottom-right');
      } catch (error) {
        console.log("Error accessing API response")
      }
    }
  };

  const goToRegister = () => {
    navigate('/register');
  }

  const goToResetPasswordRequest = () => {
    navigate('/password-reset-request');
  }

  return (
    <section className='max-w-[100vw] h-screen flex items-center justify-center xl:justify-start gap-20 bg-slate-200'>
      <form onSubmit={handleSubmit} className="w-full xl:w-[750px] h-screen rounded-lg flex items-center justify-center xl:justify-start">
        <div className="w-full  xl:w-[750px] max-w-xl rounded-lg shadow-md py-6 px-4 xl:px-16 bg-slate-50 h-screen flex flex-col justify-center relative">
          <FullLogo className="absolute top-5 left-5" /> 
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
          <div className='w-[100%] h-[1px] bg-gray-300 mb-6'></div>
          <div className="flex flex-col">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Senha" />
            <div className="flex flex-col">
              <a onClick={goToResetPasswordRequest} className="cursor-pointer text-sm text-blue-500 hover:underline mb-0.5">Esqueceu sua senha?</a>
              <p className="text-gray-900 mt-4"> Não tem uma conta ainda? <a onClick={goToRegister} className="text-sm text-blue-500 -200 hover:underline mt-4 cursor-pointer">Registre-se</a></p>
            </div>
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Login</button>
            {/* <GoogleLoginBtn className="mt-2" /> */}
          </div>
        </div>
      </form>
      <div className='hidden border w-full xl:flex items-center justify-center'>
        <img src="/hero.svg" width="550"></img>
      </div>
     <ToastContainer />
    </section>
  );
};

export default Login;
