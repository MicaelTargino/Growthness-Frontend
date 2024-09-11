import React from "react";
import SideBarItem from "./SideBarItem";
import FullLogo from "./FullLogo";
import { LayoutDashboard, LogOutIcon, Settings2Icon, SettingsIcon } from "lucide-react";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SideBar = ({SectionActive=""}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    }
    return (
    <div className="card w-auto bg-slate-50 p-5 shadow-lg pt-20 shadow-slate-300 rounded-md">
      <ul className="w-full flex flex-col gap-2">
        <SideBarItem
          Icon={LayoutDashboard}
          text="Dashboard"
          active={SectionActive == "Dashboard"}
          />
        <SideBarItem
          Icon={SettingsIcon}
          text="Settings"
          active={SectionActive == "Settings"}
          />
        <SideBarItem
          handleClick={handleLogout}
          Icon={LogOutIcon}
          text="Logout"
          active={SectionActive == "Logout"}
        />
      </ul>
    </div>
  );
};

export default SideBar;
