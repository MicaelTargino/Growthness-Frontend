import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import SideBar from '../components/SideBar';
import { SquareArrowOutUpRight } from 'lucide-react';
import CompleteProfileStep from '../components/CompleteProfileStep';
import axios from 'axios';
import { fetchUserStatus } from '../services/UserInfoService';

const Home = () => {
    const [UserProfileCompletionInfo, setUserProfileCompletionInfo] = useState();

    var navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }

    useEffect(() => {
        const getData =  async () => {
            const userData = await fetchUserStatus();
            setUserProfileCompletionInfo(userData);
        }
        getData();
    }, [])

    return (
        <section className='w-[100vw] max-w-[100vw] h-[100vh] bg-lightest flex'>
            <SideBar SectionActive="Dashboard" />
            <NavHeader absolute={true} />
            <main className='w-full p-6'>
                <section className='mt-16'>
                    {UserProfileCompletionInfo?.profile_complete == false && (
                        <div className='flex flex-col max-w-72 h-52 p-4 border-2 rounded-xl shadow-md'>
                            {/* <CircleAlertIcon size={48} className='text-red-600' /> */}
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
                                {/* <CompleteProfileStep completed={!UserProfileCompletionInfo.missing_fields.includes('height')} description="Adcione sua altura" className="border-b py-1 px-1" /> */}
                                {/* <CompleteProfileStep completed={!UserProfileCompletionInfo.missing_fields.includes('goals')} description="Adcione seu(s) objetivos" className='py-1 px-1' /> */}
                            </ul>
                        </div>
                    )}
                </section>
            </main>
        </section>
    );
};

export default Home;
