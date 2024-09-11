import React from "react";

const SideBarItem = ({ Icon, text, handleClick=() => {}, active=false }) => {



  return (
    <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
      <button onClick={() => handleClick()} className={`p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:text-white hover:bg-blue-500 hover:shadow-inner text-gray-700 transition-all ease-linear ${active ? "text-white bg-blue-500" : ""} `}>
        <Icon className="size-6" />
        {text}
      </button>
    </li>
  );
};

export default SideBarItem;
