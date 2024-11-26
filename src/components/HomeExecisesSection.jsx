import { PlusSquareIcon, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateExerciseDialog from "./CreateExerciseDialog";
import { fetchRoutineId } from "../services/ExercisesService";
const HomeExercisesSection = ({ name, exercises }) => {
    const [exercisesData, setExercisesData] = useState(exercises); // Initialize state
    const [routineId, setRoutineId] = useState(null); // State to store routine ID
    const navigate = useNavigate();

    // UseEffect will run when the `exercises` prop changes
    useEffect(() => {
        setExercisesData(exercises); // Set the exercisesData when exercises prop changes
    }, [exercises]); // Adding exercises as a dependency

    // Fetch the routine ID on component mount
    useEffect(() => {
        async function fetchData() {
            const fetchedRoutineId = await fetchRoutineId();
            setRoutineId(fetchedRoutineId);
        }
        fetchData()
    }, []); // Only run on mount

    const goToExercisePage = (id) => {
        navigate(`/exercise/${id}`);
    };

    return (
        <section className="min-w-[270px] w-[24%] max-w-[300px] p-4 rounded-xl shadow-md hover:shadow-lg border-2 hover:scale-105 transition-all min-h-60 h-auto">
            <h4 className="text-slate-800 font-bold text-xl mb-4 flex items-center gap-2">
                {name}
                {routineId && <CreateExerciseDialog routineId={routineId} />}
                {/* <PlusSquareIcon size={26} className="text-[#417ff6] cursor-pointer hover:scale-105" /> */}
            </h4>
            <ul>
                {exercisesData && exercisesData.length > 0 ? (
                    exercisesData.map((exercise) => (
                        <li
                            onClick={() => goToExercisePage(exercise.id)}
                            className="cursor-pointer hover:bg-slate-300 transition-all p-2 rounded-xl"
                            key={exercise.id}
                        >
                            <p className="flex gap-2 items-center">
                                {exercise.exercise_name}
                                <SquareArrowOutUpRight
                                    size={24}
                                    className="text-[#417ff6] cursor-pointer hover:scale-105"
                                />
                            </p>
                        </li>
                    ))
                ) : (
                    <p>No exercises available for today</p>
                )}
            </ul>
        </section>
    );
};

export default HomeExercisesSection;
