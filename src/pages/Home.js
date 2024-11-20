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
import { userDataIsEmpty } from '../services/authService';

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
        async function init() {
            try {
                // Check if user data is empty
                const user_is_empty = await userDataIsEmpty();
                // alert(user_is_empty);
                if (user_is_empty) {
                    navigate('/demo');
                    return; // Exit if user data is empty
                }

                // Fetch multiple data in parallel
                const [userProfile, habitsStatus, exercises, diets] = await Promise.all([
                    fetchUserStatus(),
                    fetchHabitsStatus(),
                    fetchExercises(),
                    fetchMeals(),
                ]);

                // Set the fetched data to state
                setUserProfileCompletionInfo(userProfile);
                setDailyHabits(habitsStatus);
                setExercises(exercises);
                setMeals(diets);

                console.log("Data fetched successfully.");
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        }

        init();
    }, []); // Runs once when the component mounts


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
