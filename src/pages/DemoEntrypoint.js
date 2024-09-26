import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { fetchUserData, updateUserData } from "../services/UserInfoService";
import GoalComponent from "../components/GoalOption";
import { notify } from '../services/toastService';
import { ToastContainer } from 'react-toastify';
import { DatePickerDemo } from "../components/DatePicker";
import { parseISO } from "date-fns";
import { sendDataToAI } from "../services/aiService";
import { useNavigate } from "react-router-dom";

const DemoEntrypoint = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        weight: null,
        height: null,
        weight_measure: 'kg',
        height_measure: 'm',
        goals: [],
        birth_date: null,  // Add a field for the birth date
        available_days: [], // Add a field for available workout days
        comorbidade: ""
    });

    useEffect(() => {
        const func = async () => {
            const data = await fetchUserData();
            if (data.birth_date) {
                // Convert the date to a JavaScript Date object with date-fns
                data.birth_date = parseISO(data.birth_date);
            }
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
            birth_date: selectedDate  // Update the birthDate field in userData
        });
    };

    // Function to handle available days selection
    const handleDayChange = (day) => {
        const availableDays = userData.available_days || [];  // Garante que available_days seja um array
        const updatedDays = availableDays.includes(day)
            ? availableDays.filter(d => d !== day) // Remove o dia se já estiver selecionado
            : [...availableDays, day];  // Adiciona o dia se não estiver selecionado
    
        setUserData({
            ...userData,
            available_days: updatedDays
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();  // Prevent default form submission behavior
            setLoading(true)
            console.log(userData)

            const res = await sendDataToAI(userData)
            // setTimeout(() => {
            // }, 2000)
            
            setLoading(false)
            navigate('/home');
            // const res = await updateUserData(userData);  // Send updated data to the backend
            // notify('success', 'Dados gerados com sucesso.', 'bottom-right');
        } catch (err) {
            // notify('error', 'Erro ao atualizar perfil.', 'bottom-right');
        }
    };

    return (
        <MainLayout>
            {loading ? (
                /* From Uiverse.io by milley69 */ 
                <div class="loading w-full flex justify-center relative h-[80vh]">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-12">Gerando plano de acompanhamento...</h2>
                    <svg className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" width="256px" height="192px" viewBox="0 0 64 48"> 
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                    </svg>
                </div>
            ) : (
            <section className="w-full flex items-center justify-center">
                <form className="w-full max-w-[750px] lg:w-[750px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start" onSubmit={handleSubmit}>
                    <div className="w-full max-w-[750px] lg:max-w-full lg:w-[750px] rounded-lg shadow-md py-6 px-0 md:px-4 xl:px-8 bg-slate-50 flex flex-col justify-center relative">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informe seus dados</h2>
                        <div className='w-[100%] h-[1px] bg-gray-300 mb-2'></div>
                        <p className="text-gray-900 mb-6">Te ajudaremos a alcançar seus objetivos.</p>

                        {/* Goal Selection */}
                        <div className="px-0 md:px-4 py-5 bg-white flex flex-wrap items-center justify-center md:justify-around rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
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
                                <div className="flex flex-col w-full max-w-[250px] mt-6 md:mt-0 overflow-visible">
                                    <h2 className="text-xl font-semibold mb-3 select-none">Insira seus dados atuais: </h2>
                                    
                                    <div className="mb-4">
                                        <DatePickerDemo description="Nascimento" placeholder="Selecione sua data de nascimento" selectedDate={userData.birth_date} onDateChange={handleDateChange} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            name="weight"
                                            value={userData?.weight || ''}
                                            onChange={handleChange}
                                            className="bg-gray-100 w-full text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            placeholder="Insira seu peso"
                                        />
                                        <select
                                            name="weight_measure"
                                            value={userData?.weight_measure || 'kg'}
                                            onChange={handleChange}
                                            className="bg-gray-100 text-gray-900 rounded-lg p-2 mb-4"
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
                                            className="bg-gray-100 border text-gray-900 w-full rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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

                            {/* Available workout days */}
                            <div className="flex flex-col max-w-[250px] mt-6">
                                <h2 className="text-xl font-semibold mb-3 select-none">Dias disponíveis para treinar:</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => (
                                        <label key={day} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={userData.available_days?.includes(day)}
                                                onChange={() => handleDayChange(day)}
                                                className="accent-current"
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col w-full max-w-[250px] mt-6">
                                <h2 className="text-xl font-semibold mb-3 select-none">Você possui alguma comorbidade física?</h2>
                                <label className="mb-2 text-gray-700" htmlFor="comorbidade">
                                    Descreva abaixo, se houver:
                                </label>
                                <textarea
                                    name="comorbidade"
                                    value={userData?.comorbidade || ''}
                                    onChange={handleChange}
                                    className="bg-gray-100 text-gray-900 w-full rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    placeholder="Descreva suas comorbidades, se houver"
                                    rows="4"
                                />
                            </div>
                                <button
                                    type="submit"
                                    className="w-[90%] md:w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-6 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                                >
                                    Gerar plano personalizado
                                </button>
                        </div>
                    </div>
                </form>
            </section>
            )}
            <ToastContainer />
        </MainLayout>
    );
}

export default DemoEntrypoint;
