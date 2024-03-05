import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  name: string;
  options: string[];
  selectedOption: number;
  onSelect: (option: number) => void;
}

const DropdownDP: React.FC<DropdownProps> = ({ name, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: number) => {
    onSelect(option);
    closeDropdown();
  };

  const dropdownVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as HTMLElement) &&
        ((event.target as HTMLElement).id !== 'DropdownButton3')
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative self-center w-full h-full">
      <motion.div className="relative flex w-full h-full">
        <motion.button
          id='DropdownButton3'
          className={`h-full self-center w-full border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 placeholder-gray focus:ring-red-500 text-left pl-3 truncate 
                     text-black`}
          onClick={toggleDropdown}
        >
          {selectedOption < 10 ? `0${selectedOption}` : `${selectedOption}`}
        </motion.button>
        <AnimatePresence>
          <motion.button
            className={`flex absolute top-1.5 h-6 w-3 right-1 items-center pointer-event-stroke 
                      -translate-y-1/2 rounded-r-xl`}
            id='DropdownButton3'
            onClick={toggleDropdown}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiOutlineChevronDown id='DropdownButton3' className="text-black w-full" />
          </motion.button>
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}
              className={`top-10 origin-center absolute w-full rounded shadow bg-white z-10`}
            >
              <ul
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                className="max-h-32 overflow-y-auto no-scrollbar"
              >
                {options.map((option, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className={`block h-9 text-sm text-gray-700 border-b-[1px] 
                                 ${index === options.length - 1
                          ? 'border-transparent hover:bg-gray-100 hover:rounded-b w-full'
                          : index === 0
                            ? 'border-gray-300 hover:bg-gray-100 hover:rounded-t w-full'
                            : 'border-gray-300 hover:bg-gray-100 w-full'
                        }`}
                      onClick={() => handleOptionClick(parseInt(option))}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DropdownDP;
