import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    var navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }
    return (
        <>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Home;
