// src/pages/Contact.js
import React from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Marketing = () => {
    const navigate = useNavigate();

    return (
        <section className='bg-slate-200 h-[100vh] flex flex-co justify-center md:flex-row flex-wrap items-center md:justify-around'>
            <div className="flex flex-col gap-4">
                <span className="flex flex-col items-center md:items-start">
                    <h1 className='text-gray-900 font-bold md:text-7xl text-5xl'>Growthness</h1>
                    <h4 className="text-gray-800 font-bold pl-3 mt-3">Cresça com inteligência</h4>
                </span>
                {/* <p>
                    Cresça com propósito. Alcance suas metas com inteligência
                </p> */}
                <p className='max-w-[460px] pl-3 text-center md:text-left'>
                    Receba exercícios, dietas e metas personalizadas com inteligência artificial e acompanhe seu progresso em gráficos detalhados.   
                </p>
                <button onClick={() => navigate("/register")} className="hidden md:block w-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                    Experimente o Growthness
                </button>
            </div>
            <img src="/hero.svg" className="w-[250px] sm:w-[350px] md:w-[550px]"></img>
            <button onClick={() => navigate("/register")} className="block md:hidden w-[90%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                    Experimente o Growthness
            </button>       
        </section>
    );
};

export default Marketing;
