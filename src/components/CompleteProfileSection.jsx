import { SquareArrowOutUpRight } from "lucide-react"
import CompleteProfileStep from "./CompleteProfileStep"

const CompleteProfileSection = ({handleClick, UserProfileCompletionInfo}) => {
    return (
        <div onClick={handleClick} className='hover:scale-105 hover:shadow-lg transition cursor-pointer flex flex-col min-w-[270px] w-[24%] min-h-60 max-h-72 p-4 border-2 rounded-xl shadow-md'>
            <h4 className='text-slate-800 font-bold text-xl mb-4 flex items-center gap-4'>
                Complete seu perfil <SquareArrowOutUpRight className="text-[#417ff6] cursor-pointer hover:scale-105" />
            </h4>
            <div className='w-[90%] flex items-center gap-3'>
                <div class="skill-level w-full h-4 rounded-full">
                    <div class="skill-percent bg-[#417ff6]" style={{width: `${UserProfileCompletionInfo?.percentage}%`}}></div>
                </div>
                <div class="skill-percent-number">{UserProfileCompletionInfo?.percentage}%</div>
            </div>
            <ul className='flex flex-col mt-4'>
                {UserProfileCompletionInfo.fields.map(item => (
                    <CompleteProfileStep completed={item.completed} description={item.description} className="border-b pb-1 px-1" />
                ))}
            </ul>
        </div>
    )
}

export default CompleteProfileSection