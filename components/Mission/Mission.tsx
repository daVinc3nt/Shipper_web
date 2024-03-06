import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CollapsIcon } from "../Icons";
import { FormattedMessage, useIntl } from "react-intl";
import MissionCard from "./MissionCard";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import fetchTask from "@/api/getTask";

const Mission = ({ toggleCollapse, setToggleCollapse }) => {
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const intl = useIntl();
  const [selectedOption, setSelectedOption] = useState("all");

  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTask(0);
      setData(result);
    };
    fetchData();
  }, []);

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 ml-2 lg:ml-4  mt-2 lg:mt-4 bg-formBgColor-parent flex flex-col justify-between rounded-2xl z-20",
    {
      "h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] lg:h-[calc(100%-2rem)] md:w-4/6 lg:w-7/12 xl:w-[calc(45%)] w-[calc(100%-1rem)]":
        !toggleCollapse,
      "w-16 lg:w-20 h-[calc(4rem)] lg:h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-7/12": !toggleCollapse,
      },
    }
  );

  const collapseIconClasses = classNames(
    "-bottom-2 lg:-bottom-6 p-2 lg:p-4 rounded bg-goBackNCollapse-default hover:bg-goBackNCollapse-hover absolute left-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleOrderFormToggle = () => {
    fetchTask(0);
    setToggleCollapse(!toggleCollapse);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setToggleCollapse2(toggleCollapse);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);

  const getFilterId = (option) => {
    switch (option) {
      case "all":
        return 1;
      case "today":
        return 2;
      case "this_week":
        return 3;
      case "this_month":
        return 4;
      default:
        return 1;
    }
  };


  return (
    <div className="absolute top-0 h-full w-full" key="mission">
      <div
        className={wrapperClasses}
        style={{
          transition:
            "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s",
        }}
      >
        <div className="flex flex-col grow h-full">
          <div className="relative">
            <button
              className={collapseIconClasses}
              onClick={handleOrderFormToggle}
            >
              <CollapsIcon />
            </button>
            <Dropdown className={`z-30`}>
              <DropdownTrigger>
                <Button className={`absolute rounded-md border right-0 text-black -bottom-2 lg:-bottom-6 p-1 lg:p-3 min-w-[80px] ${!toggleCollapse && !toggleCollapse2 ? "block" : "hidden"}`} >
                  <span className="bg-white rounded-full font-normal">{intl.formatMessage({ id: `Mission.Filter${getFilterId(selectedOption)}` })}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-white border border-gray-300 no-scrollbar rounded-md w-full max-h-80 overflow-y-auto"
                aria-labelledby="dropdownMenuButton2"
                key="dropdownMenuButton2"
              >
                <DropdownItem key="filter_all" textValue="filter_all">
                  <Button
                    aria-label="dropdownItem1"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === "all" ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption("all")}
                  >
                    <FormattedMessage id="Mission.Filter1" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_today" textValue="filter_today">
                  <Button
                    aria-label="dropdownItem2"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === "today" ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption("today")}
                  >
                    <FormattedMessage id="Mission.Filter2" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_this_week" textValue="filter_this_week">
                  <Button
                    aria-label="dropdownItem3"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === "this_week" ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption("this_week")}
                  >
                    <FormattedMessage id="Mission.Filter3" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_this_month" textValue="filter_this_month">
                  <Button
                    aria-label="dropdownItem4"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === "this_month" ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption("this_month")}
                  >
                    <FormattedMessage id="Mission.Filter4" />
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {!toggleCollapse && !toggleCollapse2 && <div key="listCard" className="flex flex-col gap-2 relative h-full w-full mt-4 lg:mt-8 border-2 border-gray-200 rounded-md p-2 bg-gray-100">
            {data?.map((data, index) => (<MissionCard data={data} toggle={handleOrderFormToggle} keyName={`mission_card_${index}`} />))}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Mission;
