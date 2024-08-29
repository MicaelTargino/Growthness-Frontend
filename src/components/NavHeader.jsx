import react from "react";
import FullLogo from "./FullLogo";
import NavProfileDropdown from "./NavProfileDropdown";
import { IsAuthenticated } from "../services/authService";

const NavHeader = () => {
    return (
        <header className='bg-slate-50 top-0 absolute p-2 shadow-md w-full h-auto flex items-end justify-between'>
            <FullLogo /> 
            {IsAuthenticated() && (
                <span className="mr-0 md:mr-4 lg:mr-6"><NavProfileDropdown /></span>
            )}
        </header>
    )
}

export default NavHeader; 