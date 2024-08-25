import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    var navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }
    return (
        <section className='w-[100vw] h-[100vh] bg-lightest'>
            <h1>Home Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </section>
    );
};

export default Home;
