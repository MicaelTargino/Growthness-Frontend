import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';
import FullLogo from '../components/FullLogo';
import { useNavigate } from 'react-router-dom';
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';


const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', password2: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);

      await loginUser(formData);  
      navigate('/home')    

    } catch (error) {
      notify('error', error.response.data.message, 'bottom-right');
    }
  };

  const GoToLogin = () => {
    navigate('/login')
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
    //   <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
    //   <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
    //   <input type="password2" name="password" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required />
    //   <button type="submit">Register</button>
    // </form>
    <section className='w-[100vw] h-screen bg-slate-200 relative flex items-center justify-center'>
        <header className='bg-slate-50 top-0 absolute p-2 shadow-md w-full h-auto flex items-center justify-start'>
            <FullLogo  />
        </header>
        <form onSubmit={handleSubmit} className="w-[650px] rounded-lg flex items-center justify-center xl:justify-start">
        <div className="w-[650px] rounded-lg shadow-md py-6 px-4 xl:px-16 bg-slate-50 flex flex-col justify-center relative">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrar</h2>
          <div className='w-[100%] h-[1px] bg-gray-300 mb-6'></div>
          <div className="flex flex-col">
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email" />
            <input required type="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Senha" />
            <input required type="password" name="password2" value={formData.password2} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Confirme sua Senha" />
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