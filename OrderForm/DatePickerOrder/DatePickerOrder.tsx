import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import DayDisplay from "./DayDisplay";
import YearPicker from "./YearPicker";
import { motion, AnimatePresence } from 'framer-motion';
import DropdownDP from "./DropDownDP";
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay
} from "date-fns";
import { FormattedMessage } from "react-intl";

type DatepickerType = "date" | "month" | "year";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dropdownVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const DatePickerOrder = () => {
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState<DatepickerType>("date");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedHour, setSelectedHour] = useState<number>(selectedDate.getHours());
  const [selectedMinute, setSelectedMinute] = useState<number>(selectedDate.getMinutes());

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        setSelectedDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        setSelectedDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        setSelectedDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date);

    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      month,
      selectedDate.getMonth()
    );

  const isToday = (date: number) =>
    isEqual(
      date,
      selectedDate.getDate()
    )



  const setDateValue = (date: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
        selectedHour,
        selectedMinute
      )
    );
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
        selectedHour,
        selectedMinute
      )
    );
  };

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        selectedDate.getFullYear(),
        month,
        selectedDate.getDate(),
        selectedHour,
        selectedMinute
      )
    );
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        month,
        selectedDate.getDate(),
        selectedHour,
        selectedMinute
      )
    );
    setType("date");
  };

  const setTimeValue = (hour: number, minute: number) => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute
      )
    );
    setShowDatepicker(false);
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("year");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as HTMLElement) &&
        ((event.target as HTMLElement).id !== 'DropdownButton2')
      ) {
        setShowDatepicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="antialiased sans-serif flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl my-4">
      <div className="relative w-full">
        <input
          type="text"
          readOnly
          className="cursor-pointer h-12 self-center w-full border border-gray-300 
                    rounded focus:outline-none focus:ring-2
                    placeholder-gray focus:ring-red-500 text-left pl-3 text-black pr-12"
          placeholder="Select date"
          value={format(selectedDate, "HH:mm dd-MM-yyyy")}
          onClick={toggleDatepicker}
          id='DropdownButton2'
        ></input>
        <div
          className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
          onClick={toggleDatepicker}
          id='DropdownButton2'
        >
          <svg
            className={`h-6 w-full ${showDatepicker ? 'text-red-500' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            id='DropdownButton2'
          >
            <path
              id='DropdownButton2'
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <AnimatePresence>
          {showDatepicker && (
            <motion.div
              ref={dropdownRef}
              className="bg-white mt-12 rounded-lg shadow p-4 absolute top-2 left-0 z-10 flex flex-col sm:flex-row"
              style={{ width: "100%" }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}
            >
              <div className="border-y-2 py-2 rounded-xl sm:border-x-2 border-gray-300 sm:px-2">
                <Header
                  decrement={decrement}
                  increment={increment}
                  type={type}
                  datepickerHeaderDate={datepickerHeaderDate}
                  showMonthPicker={showMonthPicker}
                  showYearPicker={showYearPicker}
                />

                {type === "date" && (
                  <DayDisplay
                    DAYS={DAYS}
                    blankDays={blankDays}
                    dayCount={dayCount}
                    setDateValue={setDateValue}
                    isToday={isToday}
                  />
                )}

                {type === "month" && (
                  <div className="flex flex-wrap -mx-1">
                    {Array(12)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          onClick={setMonthValue(i)}
                          style={{ width: "25%" }}
                        >
                          <div
                            className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${isSelectedMonth(i)
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-blue-200"
                              }`}
                          >
                            {format(
                              new Date(
                                datepickerHeaderDate.getFullYear(),
                                i,
                                datepickerHeaderDate.getDate()
                              ),
                              "MMM"
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {type === "year" && (
                  <YearPicker
                    setYearValue={(year: number) => {
                      setDatepickerHeaderDate(
                        new Date(
                          year,
                          selectedDate.getMonth(),
                          selectedDate.getDate(),
                          selectedHour,
                          selectedMinute
                        )
                      );
                      setSelectedDate(
                        new Date(
                          year,
                          selectedDate.getMonth(),
                          selectedDate.getDate(),
                          selectedHour,
                          selectedMinute
                        )
                      );
                      setType("date");
                    }}
                    datepickerHeaderDate={datepickerHeaderDate}
                  />
                )}

              </div>

              <div className="relative flex self-center items-center content-center sm:ml-3 flex-col pt-5 sm:pt-0">
                <h1 className="sm:top-10 text-center text-md">
                  <FormattedMessage id="OrderForm.MoreDetailsForm.pickupTime2"/>
                </h1>

                <div className="flex flex-row my-5">
                  <div className="mr-2 bg-white w-12 text-right h-9">
                    <DropdownDP
                      name="Choose hour"
                      options={Array.from({ length: 24 }).map((_, i) => (i < 10 ? `0${i}` : `${i}`))}
                      selectedOption={selectedHour}
                      onSelect={(option) => setSelectedHour(option)}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-700">:</span>
                  <div className="ml-2 bg-white w-12 text-right h-9">
                    <DropdownDP
                      name="Choose minute"
                      options={['00', '30']}
                      selectedOption={selectedMinute}
                      onSelect={(option) => setSelectedMinute(option)}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={() => setTimeValue(selectedHour, selectedMinute)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="sm:bottom-8 px-5 py-1.5 w-11/12 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  <FormattedMessage id="OrderForm.MoreDetailsForm.pickupTime3"/>
                </motion.button>

              </div>

            </motion.div>

          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default DatePickerOrder;
