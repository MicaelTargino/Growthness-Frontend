import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Marketing from './pages/Marketing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import ProfilePage from './pages/ProfilePage';
import HabitPage from './pages/Habit';
import DemoEntrypoint from './pages/DemoEntrypoint';
import ExercisePage from './pages/ExercisePage';
import MealPage from './pages/MealPage';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* standard routes */}
                <Route path="/" element={<Marketing />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/demo" element={<ProtectedRoute><DemoEntrypoint /></ProtectedRoute>} />

                {/* authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/password-reset-request" element={<PasswordResetRequest />} />
                <Route path="/reset-password/:uid/:token" element={<PasswordResetConfirm />} />

                {/* user profile routes */}
                <Route path="/profile" element={<ProfilePage />} />

                {/* habits routes */}
                <Route path="/habit/:habitId" element={<HabitPage />} />
                
                {/* exercises routes */}
                <Route path="/exercise/:exerciseId" element={<ExercisePage />} />

                {/* meals routes */}
                <Route path="/meal/:mealId" element={<MealPage />} />

            </Routes>
        </Router>
    );
};

export default App;
