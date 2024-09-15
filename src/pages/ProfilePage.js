import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { fetchUserData, updateUserData } from "../services/UserInfoService"; // assuming you have updateUserData
import GoalComponent from "../components/GoalOption";
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';
import { DatePickerDemo } from "../components/DatePicker";
import { parseISO } from "date-fns";

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        weight: '',
        height: '',
        weight_measure: 'kg',
        height_measure: 'm',
        goals: [],
        birth_date: null,  // Add a field for the birth date
    });

    useEffect(() => {
        const func = async () => {
            const data = await fetchUserData();
            if (data.birth_date) {
                // Convert the date to a JavaScript Date object with date-fns
                data.birth_date = parseISO(data.birth_date);
            }
            console.log(data)
            setUserData(data);
        };
        func();
    }, []);

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value  // Update the state dynamically based on the input's name
        });
    };

    // Function to handle goal selection
    const handleGoalChange = (goalId) => {
        setUserData({
            ...userData,
            goal: goalId  // Update goal in userData
        });
    };

    // Function to handle date change from DatePicker
    const handleDateChange = (selectedDate) => {
        setUserData({
            ...userData,
            birthDate: selectedDate  // Update the birthDate field in userData
        });
    };

    const handleSubmit = async (e) => {
        try {
            console.log(userData)
            e.preventDefault();  // Prevent default form submission behavior
            const res = await updateUserData(userData);  // Send updated data to the backend
            notify('success', 'Perfil atualizado com sucesso.', 'bottom-right');
        } catch (err) {
            notify('error', 'Erro ao atualizar perfil.', 'bottom-right');
        }
    };

    return (
        <MainLayout sectionActive="Profile">
            <section className="w-full flex items-center justify-center">
                <form className="w-full max-w-[750px] lg:w-[750px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start" onSubmit={handleSubmit}>
                    <div className="w-full max-w-[750px] lg:max-w-full lg:w-[750px] rounded-lg shadow-md py-6 md:px-4 xl:px-8 bg-slate-50 flex flex-col justify-center relative">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados do Perfil</h2>
                        <div className='w-[100%] h-[1px] bg-gray-300 mb-2'></div>
                        <p className="text-gray-900 mb-6">Esses dados serão usados para medir sua evolução.</p>

                        {/* Goal Selection */}
                        <div className="md:px-4 py-5 bg-white flex flex-wrap items-center justify-center md:justify-between rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
                            <div className="flex flex-col gap-2">
                                <div className="min-w-[250px]">
                                    <legend className="text-xl font-semibold mb-3 select-none">Defina seu objetivo</legend>
                                    {userData?.goals.map(goal => (
                                        <label
                                            key={goal.id}
                                            htmlFor={`${goal.title}`}
                                            className="font-medium cursor-pointer h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                                        >
                                            <div className="w-5">
                                                <GoalComponent goal={goal.title} />
                                            </div>
                                            {goal.title}
                                            <input
                                                type="radio"
                                                name="goal"
                                                value={goal.id}
                                                defaultChecked={goal.selected}
                                                onChange={() => handleGoalChange(goal.id)}
                                                className="w-4 h-4 absolute accent-current right-3"
                                                id={`${goal.title}`}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* User's current weight and height */}
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Insira seus dados atuais: </h2>
                                
                                <div className="mb-4">
                                    {/* Pass the handleDateChange function to DatePicker */}
                                    <DatePickerDemo selectedDate={userData.birth_date} onDateChange={handleDateChange} />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="weight"
                                        value={userData?.weight || ''}
                                        onChange={handleChange}
                                        className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        placeholder="Insira seu peso"
                                    />
                                    <select
                                        name="weight_measure"
                                        value={userData?.weight_measure || 'kg'}
                                        onChange={handleChange}
                                        className="bg-gray-100 border text-gray-900 rounded-lg p-2 mb-4"
                                    >
                                        <option value="kg">Kg</option>
                                        <option value="lbs">Lbs</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="height"
                                        value={userData?.height || ''}
                                        onChange={handleChange}
                                        className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        placeholder="Insira sua altura"
                                    />
                                    <select
                                        name="height_measure"
                                        value={userData?.height_measure || 'm'}
                                        onChange={handleChange}
                                        className="bg-gray-100 border text-gray-900 rounded-lg p-2 mb-4"
                                    >
                                        <option value="m">m</option>
                                        <option value="cm">cm</option>
                                        <option value="feet">ft</option>
                                    </select>
                                </div>
                            </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                                >
                                    Salvar
                                </button>
                        </div>
                    </div>
                </form>
            </section>
            <ToastContainer />
        </MainLayout>
    );
};

export default ProfilePage;
