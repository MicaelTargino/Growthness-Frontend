import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Button } from "../components/ui/button";
import { CircleChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getHabitCompletionData, getHabitData, getHabitLogsData } from "../services/HabitsService";
import FrequencyBadge from "../components/FrequencyBadge";
import HabitLogsLineChart from "../components/HabitLogsLineChart";

const HabitPage = () => {
    const navigate = useNavigate();
    const { habitId } = useParams();
    const [habit, setHabit] = useState({ name: "" });
    const [habitCompletion, setHabitCompletionData] = useState({ percentage_completion: 0 });
    const [today, setToday] = useState(new Date().toLocaleDateString("pt-br"));
    const [chartStartDate, setChartStartDate] = useState("7");
    const [chartDateStep, setChartDateStep] = useState("1");

    useEffect(() => {
        const initPage = async () => {
            const habitData = await getHabitData(habitId);
            const habitCompletionData = await getHabitCompletionData(habitId);

            // const habitLogsData = await getHabitLogsData(habitId);

            setHabit(habitData);
            setHabitCompletionData(habitCompletionData);
        };
        initPage();
    }, [habitId]);

    // Update chartStartDate and chartDateStep based on selection
    const changeChart = (e) => {
        const selectedOption = e.target.value;  // Get the value from the select option
        if (selectedOption === "7") {
            setChartDateStep("1");
            setChartStartDate("7");
        } else if (selectedOption === "14") {
            setChartDateStep("1");
            setChartStartDate("14");
        } else if (selectedOption === "30") {
            setChartDateStep("1");
            setChartStartDate("30");
        } else if (selectedOption === "6months") {
            setChartDateStep("30");
            setChartStartDate("180");  // 6 months
        } else if (selectedOption === "1year") {
            setChartDateStep("30");
            setChartStartDate("365");  // 1 year
        }
    };

    return (
        <MainLayout>
            <section className="relative flex flex-col">
                <div className="flex items-center gap-4">
                    <button className="px-0 offset-0 my-0 py-0" onClick={() => navigate("/home")}>
                        <CircleChevronLeft className="text-blue-500" />
                    </button>
                    <h2 className="text-slate-800 font-bold text-3xl mb-0.5 flex items-center gap-4">
                        <span>{habit.name}</span>
                        <FrequencyBadge type={habitCompletion.frequency} />
                        <span className="font-boldest text-sm px-3 py-1 rounded-2xl bg-blue-300 shadow-lg uppercase text-blue-800">
                            {habitCompletion.percentage_completion}% 
                        </span>
                    </h2>
                </div>
                <div className="relative w-[80%] mt-6 flex flex-col items-center justify-center">
                    {/* Updated select with value and event handling */}
                    <select
                        onChange={changeChart}
                        className="absolute right-4 top-4 border p-2 rounded-xl focus:border-2 focus:border-black"
                    >
                        <option value="7">Últimos 7 dias</option>
                        <option value="14">Últimos 14 dias</option>
                        <option value="30">Último mês</option>
                        <option value="6months">Últimos 6 meses</option>
                        <option value="1year">Último ano</option>
                    </select>

                    {/* Pass the chartDateStep and chartStartDate to the chart component */}
                    <HabitLogsLineChart
                        title={`histórico de ${habit.name}`}
                        measure={habit.measure}
                        dateStep={chartDateStep}
                        startDateRange={chartStartDate}
                        label={`Quantidade (em ${habit.measure}) `}
                    />
                </div>
            </section>
        </MainLayout>
    );
};

export default HabitPage;
