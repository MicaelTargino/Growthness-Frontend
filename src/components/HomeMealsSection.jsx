import { PlusSquareIcon, SquareArrowOutUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

const HomeMealsSection = ({ name, meals }) => {
    console.log(meals)
    const [mealsData, setMealsData] = useState(meals); // Initialize state
    const navigate = useNavigate();

    // UseEffect will run when the `exercises` prop changes
    useEffect(() => {
        setMealsData(meals); // Set the exercisesData when exercises prop changes
    }, [meals]); // Adding exercises as a dependency

    const goToExercisePage = (id) => {
        navigate(`/meal/${id}`);
    }

    console.log(mealsData)

    return (
        <section className="min-w-[270px] w-[24%] max-w-[300px] p-4 rounded-xl shadow-md hover:shadow-lg border-2 hover:scale-105 transition-all min-h-60 h-auto">
            <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-2'>
                {name} 
                <PlusSquareIcon size={26} className="text-[#417ff6] cursor-pointer hover:scale-105" />
            </h4>
            <ul>
                {mealsData && mealsData.length > 0 ? (
                    mealsData.map(meal => (
                        <li
                            onClick={() => goToExercisePage(meal.id)}
                            className="cursor-pointer hover:bg-slate-300 transition-all p-2 rounded-xl"
                            key={meal.id}
                        >
                            <p className="flex gap-2 items-center">
                                {meal.name} 
                                <SquareArrowOutUpRight size={24} className="text-[#417ff6] cursor-pointer hover:scale-105" />
                            </p>
                        </li>
                    ))
                ) : (
                    <p>No meals available for today</p>
                )}
            </ul>
        </section>      
    );
};

export default HomeMealsSection;
