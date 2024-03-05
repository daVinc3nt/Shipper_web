import React from "react";
import { format } from "date-fns";

type HeaderProps = {
  decrement: () => void;
  increment: () => void;
  type: string;
  datepickerHeaderDate: Date;
  showMonthPicker: () => void;
  showYearPicker: () => void;
};

const Header: React.FC<HeaderProps> = ({
  decrement,
  increment,
  type,
  datepickerHeaderDate,
  showMonthPicker,
  showYearPicker
}) => (
  <div className="flex justify-between items-center mb-2">
    <div>
      <button
        type="button"
        className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
        onClick={decrement}
      >
        <svg
          className="h-4 w-4 xs:h-6 xs:w-6 text-gray-500 inline-flex"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
    {type === "date" && (
      <div
        onClick={showMonthPicker}
        className="flex-grow p-1 text-xs xs:text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
      >
        <p className="text-center">{format(datepickerHeaderDate, "MMMM")}</p>
      </div>
    )}
    <span className="text-lg font-bold text-gray-600 hidden xs:block">|</span>
    <div
      onClick={showYearPicker}
      className="flex-grow p-1 text-xs xs:text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
    >
      <p className="text-center">{format(datepickerHeaderDate, "yyyy")}</p>
    </div>
    <div>
      <button
        type="button"
        className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
        onClick={increment}
      >
        <svg
          className="h-4 w-4 xs:h-6 xs:w-6 text-gray-500 inline-flex"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default Header;
