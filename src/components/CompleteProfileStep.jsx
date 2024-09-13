import { CircleCheck } from "lucide-react"

const CompleteProfileStep = ({completed=false, description, className=""}) => {
    return (
        <li className={`flex items-center gap-2 ${completed && "text-green-600"} ${!completed && "hover:bg-slate-300 transition-all duration-150 cursor-pointer"} ${className}`}>
            {description} 
            { completed && <CircleCheck />}
        </li>
    )
}

export default CompleteProfileStep