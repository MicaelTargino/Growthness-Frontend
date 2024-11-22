import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Button } from "../components/ui/button";
import { CircleChevronLeft, DeleteIcon, PlusSquareIcon, Trash, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteHabi, deleteHabit, getHabitCompletionData, getHabitData, getHabitLogsData } from "../services/HabitsService";
import FrequencyBadge from "../components/FrequencyBadge";
import HabitLogsLineChart from "../components/HabitLogsLineChart";
import CreateHabitDialog from "../components/CreateHabitDialog";
import CreateHabitLogDialog from "../components/CreateHabitLogDialog";
import { deleteExercise, getExerciseData } from "../services/ExercisesService";
import ExerciseLogsLineChart from "../components/ExerciseLogsLineChart";
import CreateExerciseLogDialog from "../components/CreateExerciseLogDialog";
import { notify } from "../services/toastService";

const ExercisePage = () => {
    const navigate = useNavigate();
    const { exerciseId } = useParams();
    const [exercise, setExercise] = useState({ exercise_name: "" });
    // const [exerciseCompletion, setHabitCompletionData] = useState({ percentage_completion: 0 });
    const [today, setToday] = useState(new Date().toLocaleDateString("pt-br"));
    const [chartStartDate, setChartStartDate] = useState("7");
    const [chartDateStep, setChartDateStep] = useState("1");

    useEffect(() => {
        const initPage = async () => {
            const exerciseData = await getExerciseData(exerciseId);
            // const habitCompletionData = await getHabitCompletionData(habitId);

            // const habitLogsData = await getHabitLogsData(habitId);

            setExercise(exerciseData);
            // setHabitCompletionData(habitCompletionData);
        };
        initPage();
    }, [exerciseId]);

    const handleDeleteExercise = async () => {
        const res = await deleteExercise(exerciseId);
        console.log(res);
        console.log(res.status);
        if (res.status == 204) {
            navigate('/home');
        } else {
            notify('error', 'Erro ao deletar exercício', 'bottom-right');
        }
    }

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
                        <span>
                            {`${exercise.exercise_name} `}  
                            {exercise.weight_goal && exercise.weight_goal}
                            {exercise.weight_goal && ("kg")} 
                            {exercise.reps_goal && exercise.weight_goal && (" x ")} 
                            {exercise.reps_goal && exercise.reps_goal}
                            {exercise.reps_goal && " reps"}
                        </span>
                        {/* <FrequencyBadge type={habitCompletion.frequency} /> */}
                        {/* <span className="font-boldest text-sm px-3 py-1 rounded-2xl bg-blue-300 shadow-lg uppercase text-blue-800"> */}
                            {/* {Math.min(habitCompletion.percentage_completion, 100)}%  */}
                        {/* </span> */}
                        {/* <CreateHabitLogDialog measure={habit.measure} habitId={habitId} /> */}
                        <CreateExerciseLogDialog routineExerciseId={exerciseId} />
                        {/* <PlusSquareIcon
                            size={26}
                            className="text-[#417ff6] cursor-pointer hover:scale-105"
                        /> */}
                        <Trash onClick={handleDeleteExercise} className="text-red-600 hover:scale-105 transition-all cursor-pointer" />
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
                    </select>

                    {/* Pass the chartDateStep and chartStartDate to the chart component */}
                    <ExerciseLogsLineChart
                        exerciseId={exerciseId}
                        title={`histórico de ${exercise.exercise_name}`}
                        measure={"Kg"}
                        dateStep={chartDateStep}
                        startDateRange={chartStartDate}
                        defaultGoalValue={exercise.weight_goal}
                        label={`Quantidade (em Kg) `}
                    />
                </div>
            </section>
        </MainLayout>
    );
};

export default ExercisePage;
