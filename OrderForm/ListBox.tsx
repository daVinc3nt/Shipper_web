import React, { useState, useEffect, useRef } from "react";
import {
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";

const CommonDropdown = ({
  name,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <Dropdown className="z-50">
      <DropdownTrigger>
        <Button
          className={`text-xs md:text-sm border border-gray-300 rounded h-12 w-11/12 self-center mb-2 ${
            selectedOption ? "" : "text-gray-600"
          }`}
          aria-label={name}
        >
          {selectedOption || name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="bg-white border border-gray-300 no-scrollbar rounded w-full overflow-y-auto -mt-1"
        aria-labelledby="dropdownMenuButton"
      >
        {options.map((option, index) => (
          <DropdownItem key={index} textValue={option}>
            <Button
              onClick={() => setSelectedOption(option)}
              aria-label={option}
              className={`text-center py-1 px-2 text-black w-full ${
                selectedOption == option ? "bg-blue-500 text-white rounded" : ""
              }`}
            >
              {option}
            </Button>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CommonDropdown;
