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
import HomeHabitSection from '../components/HomeHabitSection';
import CompleteProfileSection from '../components/CompleteProfileSection';
import { fetchExercises } from '../services/ExercisesService';
import HomeExercisesSection from '../components/HomeExecisesSection';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { fetchMeals } from '../services/DietsService';
import HomeMealsSection from '../components/HomeMealsSection';

const Home = () => {
    var navigate = useNavigate();
    const [UserProfileCompletionInfo, setUserProfileCompletionInfo] = useState();
    const [dailyHabits, setDailyHabits] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [meals, setMeals] = useState([]);
    const [currentDay, setCurrentDay] = useState(format(new Date(), "EEEE"));
    const [currentDayInPTBR, setCurrentDayInPTBR] = useState(format(new Date(), "EEEE", {locale: ptBR}));

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

        const getExercisesData = async () => {
            const data = await fetchExercises();
            console.log(data) // this prints the correct data
            setExercises(data);
        }
        getExercisesData()

        const getDietsData = async () => {
            const data = await fetchMeals ();
            console.log(data) // this prints the correct data
            setMeals(data);
        }
        getDietsData()
    }, [])

    return (
        <MainLayout sectionActive="Dashboard">
            <main className="flex justify-center md:justify-normal md:flex-row  flex-wrap gap-4 min-h-[80vh]">
                {/* {UserProfileCompletionInfo?.profile_complete == false && (
                    <CompleteProfileSection handleClick={goToProfilePage} UserProfileCompletionInfo={UserProfileCompletionInfo} />
                )} */}
                <HomeHabitSection type="daily" name="Hábitos Diários" habits={dailyHabits} />
                <HomeExercisesSection name={`Exercícios de hoje`} exercises={exercises} />
                <HomeMealsSection name={`Refeições de hoje`} meals={meals} />
                {/* <HomeHabitSection type="weekly" name="Hábitos Semanais" habits={dailyHabits} /> */}
                {/* <HomeHabitSection type="monthly" name="Hábitos Mensais" habits={dailyHabits} /> */}
            </main>
        </MainLayout>
    );
};

export default Home;
