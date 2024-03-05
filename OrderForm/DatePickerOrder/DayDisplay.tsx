import React from "react";

type DayDisplayProps = {
  DAYS: string[];
  blankDays: number[];
  dayCount: number[];
  setDateValue: (date: number) => () => void;
  isToday: (date: number) => boolean;
};

const DayDisplay: React.FC<DayDisplayProps> = ({
  DAYS,
  blankDays,
  dayCount,
  setDateValue,
  isToday
}) => {

  return (
    <>
      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map((day, i) => (
          <div key={i} style={{ width: "14.26%" }} className="px-1">
            <div className="text-gray-800 font-medium text-center text-xxs xs:text-xs">
              {day}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap -mx-1">
        {blankDays.map((_, i) => (
          <div
            key={i}
            style={{ width: "14.26%" }}
            className="text-center border p-1 border-transparent text-sm"
          ></div>
        ))}
        {dayCount.map((d, i) => (
          <div key={i} style={{ width: "14.26%" }} className="px-1 mb-1">
            <div
              onClick={setDateValue(d)}
              className={`cursor-pointer text-center text-xxs xs:text-sm rounded-full leading-loose transition ease-in-out duration-100 ${isToday(d)
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-200"
                }`}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DayDisplay;
