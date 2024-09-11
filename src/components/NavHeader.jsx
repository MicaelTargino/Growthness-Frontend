import React from "react";
import FullLogo from "./FullLogo";
import NavProfileDropdown from "./NavProfileDropdown";
import { IsAuthenticated } from "../services/authService";

const NavHeader = ({ absolute=true }) => {
  return (
    <header
      className={`bg-slate-50 p-2 h-16 shadow-bottom-only w-full flex items-end justify-between ${
        absolute ? "absolute top-0" : ""
      }`}
    >
      <FullLogo />
      {IsAuthenticated() && (
        <span className="mr-0 md:mr-4 lg:mr-6">
          <NavProfileDropdown />
        </span>
      )}
    </header>
  );
};

export default NavHeader;
