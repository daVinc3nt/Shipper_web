import React, { ReactNode, useState } from "react";
import SideBar from "./Top&SideBar/SideBar";
import MenuHambuger from "./Top&SideBar/MenuHambuger";
import { Box } from "@mui/material";
import { NotifyIcon, GlobseIcon } from "../components/Icons";
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
}
//reactNode is a dataType of react, its can be JSX,
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
    <div className="flex overflow-hidden">
      <SideBar toggleCollapseMobile={toggleCollapseMobile} />
      <div className="flex-1 flex flex-col h-screen ">
        <div className="flex flex-col">
          <header className="h-14 flex justify-end w-full bg-red-900 items-center px-4 xl:px-2 ">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex flex-row gap-2">
                  <LangSelector />
                  <NotifyIcon />
                </div>
                <MenuHambuger toggle={handleSidebarToggleMobile} />
              </div>
            </div>
          </header>
        </div>
        {!toggleCollapseMobile && (
          <div className="lg:hidden flex-1 flex z-40 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
        )}
        <div className="flex bg-red-800 flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
