import react from "react";
import FullLogo from "./FullLogo";

const NavHeader = () => {
    return (
        <header className='bg-slate-50 top-0 absolute p-2 shadow-md w-full h-auto flex items-center justify-start'>
            <FullLogo />
        </header>
    )
}

export default NavHeader; 