import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import SideBar from '../components/SideBar';
const Home = () => {
    var navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }
    return (
        <section className='w-[100vw] max-w-[100vw] h-[100vh] bg-lightest flex'>
            <SideBar SectionActive="Dashboard" />
            <main className='w-full absolute'>
                <NavHeader absolute={true} />
            </main>
        </section>
    );
};

export default Home;
