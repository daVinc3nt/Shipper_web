import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CollapsIcon } from "../Icons";
import { FormattedMessage, useIntl } from "react-intl";
import MissionCard from "./MissionCard";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import fetchTask from "@/api/getTask";

const Tasks = ({ toggleCollapse, setToggleCollapse }) => {
  const intl = useIntl();
  const [data, setData] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0);
  const [toggleCollapse2, setToggleCollapse2] = useState(false);

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

  const handleReloadData = () => {
    fetchData();
  };

  const fetchData = async () => {
    const result = await fetchTask(selectedOption);
    setData(result);
  };

  const handleOrderFormToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setToggleCollapse2(toggleCollapse);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);

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
                  <span className="bg-white rounded-full font-normal">{intl.formatMessage({ id: `Mission.Filter${selectedOption + 1}` })}</span>
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
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 0 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(0)}
                  >
                    <FormattedMessage id="Mission.Filter1" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_today" textValue="filter_today">
                  <Button
                    aria-label="dropdownItem2"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 1 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(1)}
                  >
                    <FormattedMessage id="Mission.Filter2" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_this_week" textValue="filter_this_week">
                  <Button
                    aria-label="dropdownItem3"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 2 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(2)}
                  >
                    <FormattedMessage id="Mission.Filter3" />
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {!toggleCollapse && !toggleCollapse2 && (
            <div key="listCard" className="flex flex-col gap-2 relative h-full w-full mt-4 lg:mt-8 border-2 border-gray-200 rounded-md p-2 bg-gray-100">
              {data ? (
                data.map((data, index) => (
                  <MissionCard
                    data={data}
                    toggle={handleOrderFormToggle}
                    keyName={`mission_card_${index}`}
                    reloadData={handleReloadData}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full mt-10">
                  <p>Loading...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;