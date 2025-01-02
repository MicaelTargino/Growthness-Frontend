import React from "react";
import SideBarItem from "./SideBarItem";
import FullLogo from "./FullLogo";
import { LayoutDashboard, LogOutIcon, Settings2Icon, SettingsIcon, User2Icon } from "lucide-react";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SideBar = ({SectionActive=""}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    }
    const goToPage = (path) => {
      navigate(path);
    }
    

    return (
    <div className="card w-15 md:w-auto bg-slate-50 p-2 md:p-5 shadow-lg pt-20 md:pt-20 shadow-slate-300 rounded-md">
      <ul className="w-full flex flex-col gap-2">
        <SideBarItem
          Icon={LayoutDashboard}
          text="Dashboard"
          active={SectionActive == "Dashboard"}
          handleClick={()=>goToPage("/home")}
          />
        <SideBarItem
          Icon={User2Icon}
          text="Perfil"
          active={SectionActive == "Profile"}
          handleClick={()=>goToPage("/profile")}
        >

        </SideBarItem>
        {/* <SideBarItem
          Icon={SettingsIcon}
          text="Configurações"
          active={SectionActive == "Settings"}
          /> */}
        <SideBarItem
          handleClick={handleLogout}
          Icon={LogOutIcon}
          text="Sair"
          active={SectionActive == "Logout"}
        />
      </ul>
    </div>
  );
};

export default SideBar;
