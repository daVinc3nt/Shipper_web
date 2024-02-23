import React from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
import {useIntl } from "react-intl"
import { FormattedMessage } from "react-intl";
const OrderList = () => {
  const intl =useIntl();
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const fetchDemoPage = async () => {
    const result = await DemoPage();
    setDemoPage(result);
  };
  useEffect(() => {
    fetchDemoPage();
  }, []);
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col ">
      <div className="h-full items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
        <div className="container shadow-sm rounded-xl px-3 text-white bg-[#1a1b23]">
          <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
            <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">{<FormattedMessage id="order"/>}</div>
          </div>
          {demoPage}
        </div>
      </section>
      </div>
    </div>
  );
};

export default OrderList;
