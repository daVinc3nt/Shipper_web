import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import DemoPage from "../../api/getHistory";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
const HistoryMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

  useEffect(() => {
    //@ts-ignore
    fetchDemoPage(0);
  }, []);

  const fetchDemoPage = async ({ option }) => {
    const result = await DemoPage(reloadData, option);
    setDemoPage(result);
  };

  const reloadData = useCallback((option) => {
    fetchDemoPage(option);
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full bg-gray-200">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 text-black bg-white">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                <FormattedMessage id="History.Title" />
              </div>
            </div>
            <div className="w-full">{demoPage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryMenu;
