import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import SideBar from '../components/SideBar';
import { SquareArrowOutUpRight } from 'lucide-react';
import CompleteProfileStep from '../components/CompleteProfileStep';
import axios from 'axios';
import { fetchUserStatus } from '../services/UserInfoService';
import MainLayout from './layout/MainLayout';
import { fetchHabitsStatus } from '../services/HabitsService';

const Home = () => {
    var navigate = useNavigate();
    const [UserProfileCompletionInfo, setUserProfileCompletionInfo] = useState();
    const [dailyHabits, setDailyHabits] = useState([]);

    const goToProfilePage = () => {
        navigate('/profile');
    }

    useEffect(() => {
        const getProfileCompletionData =  async () => {
            const userData = await fetchUserStatus();
            setUserProfileCompletionInfo(userData);
        }
        getProfileCompletionData();

        const getHabitsStatusData = async () => {
            const data = await fetchHabitsStatus();
            setDailyHabits(data);
        }
        getHabitsStatusData()
    }, [])

    return (
        <MainLayout sectionActive="Dashboard">
            <main className="flex flex-wrap gap-4">
                {UserProfileCompletionInfo?.profile_complete == false && (
                    <div onClick={goToProfilePage} className='hover:scale-105 hover:shadow-lg transition cursor-pointer flex flex-col min-w-[270px] w-[24%] h-60 p-4 border-2 rounded-xl shadow-md'>
                        <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-4'>
                            Complete seu perfil <SquareArrowOutUpRight className="text-[#417ff6] cursor-pointer hover:scale-105" />
                        </h4>
                        <div className='w-[90%] flex items-center gap-3'>
                            <div class="skill-level w-full h-4 rounded-full">
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
                <section className="min-w-[50%] w-[70%] max-w-full border p-4 rounded-xl shadow-md">
                    <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-4'>
                        Hábitos Diários <SquareArrowOutUpRight className="text-[#417ff6] cursor-pointer hover:scale-105" />
                    </h4>
                    <ul>
                        {dailyHabits.map(dailyHabit => (
                            <p key={`${dailyHabit.habit}-${dailyHabit.percentage_completion}`}>{dailyHabit.habit} - {dailyHabit.percentage_completion}%</p>
                        ))}
                    </ul>
                </section>
            </main>
        </MainLayout>
    );
};

export default Home;
