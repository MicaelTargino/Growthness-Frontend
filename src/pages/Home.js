import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
const Home = () => {
    var navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }
    return (
        <section className='w-[100vw] h-[100vh] bg-lightest'>
            <NavHeader />
        </section>
    );
};

export default Home;
