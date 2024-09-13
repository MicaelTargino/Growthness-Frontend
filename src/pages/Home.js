import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import SideBar from '../components/SideBar';
import { SquareArrowOutUpRight } from 'lucide-react';
import CompleteProfileStep from '../components/CompleteProfileStep';
import axios from 'axios';
import { fetchUserStatus } from '../services/UserInfoService';
import MainLayout from './layout/MainLayout';

const Home = () => {
    var navigate = useNavigate();
    const [UserProfileCompletionInfo, setUserProfileCompletionInfo] = useState();

    const goToProfilePage = () => {
        navigate('/profile');
    }

    useEffect(() => {
        const getData =  async () => {
            const userData = await fetchUserStatus();
            setUserProfileCompletionInfo(userData);
        }
        getData();
    }, [])

    return (
        <MainLayout sectionActive="Dashboard">
            {UserProfileCompletionInfo?.profile_complete == false && (
                <div onClick={goToProfilePage} className='hover:scale-105 hover:shadow-lg transition cursor-pointer flex flex-col max-w-72 h-52 p-4 border-2 rounded-xl shadow-md'>
                    <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-4'>
                        Complete seu perfil <SquareArrowOutUpRight className="text-[#417ff6] cursor-pointer hover:scale-105" />
                    </h4>
                    <div className='w-[90%] flex items-center gap-3'>
                        <div class="skill-level border w-full h-4 rounded-full">
                            <div class="skill-percent bg-[#417ff6]" style={{width: `${UserProfileCompletionInfo?.percentage}%`}}></div>
                        </div>
                        <div class="skill-percent-number">{UserProfileCompletionInfo?.percentage}%</div>
                    </div>
                    <ul className='flex flex-col mt-4'>
                        {UserProfileCompletionInfo.fields.map(item => (
                            <CompleteProfileStep completed={item.completed} description={item.description} className="border-b pb-1 px-1" />
                        ))}
                    </ul>
                </div>
            )}
        </MainLayout>
    );
};

export default Home;
