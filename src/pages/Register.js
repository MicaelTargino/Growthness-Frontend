import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';
import FullLogo from '../components/FullLogo';
import { useNavigate } from 'react-router-dom';
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';
import NavHeader from '../components/NavHeader';


const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', password2: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length === 0 || formData.password.length === 0 || formData.password2.length === 0) {
      notify('error', 'Preencha todos os campos.', 'bottom-right');
      return;
    }


    try {
      await registerUser(formData);

      navigate('/login ')    
      // await loginUser(formData);  

    } catch (error) {
      notify('error', error.response.data.message, 'bottom-right');
    }
  };

  const GoToLogin = () => {
    navigate('/login')
  }

  return (
    <section className='w-[100vw] h-screen bg-slate-200 relative flex items-center justify-center'>
        <NavHeader />
        <form onSubmit={handleSubmit} className="w-full max-w-[550px] lg:w-[650px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start">
        <div className="w-full max-w-[550px] lg:max-w-full lg:w-[650px] rounded-lg shadow-md py-6 px-4 xl:px-16 bg-slate-50 flex flex-col justify-center relative">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrar</h2>
          <div className='w-[100%] h-[1px] bg-gray-300 mb-6'></div>
          <div className="flex flex-col">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Senha" />
            <input type="password" name="password2" value={formData.password2} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Confirme sua Senha" />
            <div className="flex flex-col">
              <p className="text-gray-900 mt-4"> Já tem uma conta? <a onClick={GoToLogin} className=" cursor-pointer text-sm text-blue-500 -200 hover:underline mt-4">Fazer login</a></p>
            </div>
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Registrar</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Register;
