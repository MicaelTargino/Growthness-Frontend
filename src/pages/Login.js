import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { HeartHandshake } from 'lucide-react';
import FullLogo from '../components/FullLogo';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      alert('Login successful!');
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <section className='w-[100vw] h-[100vh] flex items-center justify-start gap-20 bg-slate-200'>
      {/* <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'> */}
        {/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className='px-4 py-2 rounded-md' /> */}
        {/* <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className='px-4 py-2 rounded-md' /> */}
        {/* <button type="submit">Login</button> */}
      {/* </form> */}
      <form onSubmit={handleSubmit} className="w-[750px] h-screen rounded-lg">
        <div className="w-[750px] max-w-xl rounded-lg shadow-md py-6 px-16 bg-slate-50 h-screen flex flex-col justify-center relative">
          <FullLogo /> 
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
          <div className='w-[100%] h-[1px] bg-gray-300 mb-6'></div>
          <div className="flex flex-col">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Senha" />
            <div className="flex flex-col">
              <a href="#" className="text-sm text-blue-500 hover:underline mb-0.5">Esqueceu sua senha?</a>
              <p className="text-gray-900 mt-4"> Não tem uma conta ainda? <a href="#" className="text-sm text-blue-500 -200 hover:underline mt-4">Registre-se</a></p>
            </div>
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Login</button>
          </div>
        </div>
      </form>
      <div className='border w-full flex items-center justify-center'>
        <img src="/hero.svg" width="550"></img>
      </div>

    </section>
  );
};

export default Login;
