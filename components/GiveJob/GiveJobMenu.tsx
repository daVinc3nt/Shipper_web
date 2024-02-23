import React from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
const GiveJobMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

  useEffect(() => {
    const fetchDemoPage = async () => {
      const result = await DemoPage();
      setDemoPage(result);
    };

    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-gradient-to-b from-gray-100 to-gray-300 content-center overflow-y-hidden  flex flex-col">
      <div className=" text-3xl font-bold pl-3 py-3 shadow-sm backgroundtitle">
        <div className="text-white">Giao việc</div>
      </div>
      <div className="bg-white h-full  items-center w-full left-0 right-0 overflow-y-scroll ">
        {demoPage}
      </div>
    </div>
  );
};

export default GiveJobMenu;
