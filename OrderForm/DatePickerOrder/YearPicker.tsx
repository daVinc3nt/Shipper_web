import React from "react";

type YearPickerProps = {
  setYearValue: (year: number) => void;
  datepickerHeaderDate: Date;
};

const YearPicker: React.FC<YearPickerProps> = ({
  setYearValue,
  datepickerHeaderDate
}) => (
  <div className="h-40 flex flex-wrap -mx-1 overflow-y-scroll">
    {Array(20)
      .fill(null)
      .map((_, i) => (
        <div
          key={i - 9}
          onClick={() => {
            setYearValue(
              datepickerHeaderDate.getFullYear() + i
            );
          }}
          style={{ width: "25%" }}
        >
          <div
            className={`cursor-pointer p-3 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${datepickerHeaderDate.getFullYear() + i === datepickerHeaderDate.getFullYear()
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-200"
              }`}
          >
            {datepickerHeaderDate.getFullYear() + i}
          </div>
        </div>
      ))}
  </div>
);

export default YearPicker;
