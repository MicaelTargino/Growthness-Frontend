import { PlusSquareIcon, SquareArrowOutUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import CreateHabitDialog from "./CreateHabitDialog";
import { useState } from "react";
import { fetchHabitsStatus } from "../services/HabitsService";

const HomeHabitSection = ({name, habits, type}) => {
    const navigate = useNavigate();

    const goToHabitPage = (id) => {
        navigate(`/habit/${id}`);
    }

    return (
        <section className="min-w-[270px] w-[24%] max-w-[300px] p-4 rounded-xl shadow-md hover:shadow-lg border-2 hover:scale-105 transition-all min-h-60 h-auto">
            <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-2'>
                {name} 
                <CreateHabitDialog type={type} />
                {/* <PlusSquareIcon size={26} className="text-[#417ff6] cursor-pointer hover:scale-105" /> */}
            </h4>
            <ul>
                {habits.map(habit => {
                    if (habit.frequency == type) return (
                        <li onClick={() => goToHabitPage(habit.id)} className="cursor-pointer hover:bg-slate-300 transition-all p-2 rounded-xl" key={`${habit.habit} - ${habit.percentage_completion}`}>
                            <p className="flex gap-2 items-center">
                                {habit.habit} <SquareArrowOutUpRight size={24} className="text-[#417ff6] cursor-pointer hover:scale-105" />
                            </p>
                            <div className='w-[90%] max-w-[300px] flex items-center gap-3'>
                                <div class="skill-level w-full h-4 rounded-full">
                                    <div class="skill-percent bg-[#417ff6]" style={{width: `${habit.percentage_completion}%`}}></div>
                                </div>
                                <div class="skill-percent-number">{habit.percentage_completion}%</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>      
    )
}

export default HomeHabitSection