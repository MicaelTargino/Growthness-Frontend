import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin } from '../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleLoginBtn = ({className: cn}) => {
    // console.log(process.env.GOOGLE_AUTH_CLIENT_ID);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (response) => {
        try {
            // Wait for handleGoogleLogin to complete
            const success = await handleGoogleLogin(response);

            if (success) {
                setTimeout(() => {
                    navigate('/home');  // Navigate only after the token is saved
                }, 1000)
            }
        } catch (err) {
            console.log(err);
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className={cn}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
                <GoogleLogin onSuccess={handleLogin} onError={() => { alert('Login Failed'); }} />
                <p className="text-red-500 font-bold w-full text-center">
                    {error}
                </p>
            </GoogleOAuthProvider>
        </div>
    )
}