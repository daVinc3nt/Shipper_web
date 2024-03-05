import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import Dropdown from "./ListBox";
import DatePickerOrder from "./DatePickerOrder/DatePickerOrder";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const MoreDetailsForm = ({selectedOption3, setSelectedOption3, selectedOption4, setSelectedOption4,
                          length, setLength, width, setWidth, height, setHeight, formErrors3, setFormErrors3, setshake, currentForm}) => {
  const intl = useIntl();
  const typesOfGoods = [
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods1' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods2' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods3' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods4' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods5' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods6' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods7' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods8' })
  ];
  const massOptions = [
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.massOption1' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.massOption2' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.massOption3' }),
    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.massOption4' })
  ]
  const tabContentVariants: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const handleIncrement = () => {
    setLength((prevValue) => (prevValue + 1) % 51);
    validate(3, (length + 1) % 51, width, height, selectedOption3, selectedOption4);
  };
  
  const handleDecrement = () => {
    setLength((prevValue) => (prevValue - 1 + 51) % 51);
    validate(3, (length - 1 + 51) % 51, width, height, selectedOption3, selectedOption4);
  };
  
  const handleIncrement1 = () => {
    setWidth((prevValue) => (prevValue + 1) % 51);
    validate(3, length, (width + 1) % 51, height, selectedOption3, selectedOption4);
  };
  
  const handleDecrement1 = () => {
    setWidth((prevValue) => (prevValue - 1 + 51) % 51);
    validate(3, length, (width - 1 + 51) % 51, height, selectedOption3, selectedOption4);
  };
  
  const handleIncrement2 = () => {
    setHeight((prevValue) => (prevValue + 1) % 51);
    validate(3, length, width, (height + 1) % 51, selectedOption3, selectedOption4);
  };
  
  const handleDecrement2 = () => {
    setHeight((prevValue) => (prevValue - 1 + 51) % 51);
    validate(3, length, width, (height - 1 + 51) % 51, selectedOption3, selectedOption4)
  };
  
  const validate = (type: number, index:number, index1:number, index2:number , drop1:string, drop2:string) => {
    if (type == 1 && drop1 == '') {
      formErrors3.goods = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error1' });
    } else if (type == 1) formErrors3.goods = ''
    if (type == 2 && drop2 == '') {
      formErrors3.mass = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error2' });
    } else if (type == 2) formErrors3.mass = ''
    if (type == 3 && (index == 0 || index1 == 0 || index2 == 0)) {
      formErrors3.dimensions = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error3' });
    } else if (type == 3) formErrors3.dimensions = ''

    if(currentForm == 1){
      if (formErrors3.mass == '' && formErrors3.goods == '' && formErrors3.dimensions == ''){
        console.log(formErrors3)
        setshake(false);
      }
    }
  };

  const handleSelectOption3 = (index:string) => {
    setSelectedOption3(index);
    validate(1, length, width, height, index, selectedOption4);
  }

  const handleSelectOption4 = (index:string) => {
    setSelectedOption4(index);
    validate(2, length, width, height, selectedOption3, index);
  }

  return <div className="flex flex-col h-5/6 w-full mt-4 lg:mt-8 border-2 border-red-500 rounded-md overflow-y-auto no-scrollbar scroll-smooth">
    <motion.h1
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="mt-2 text-2xl font-bold px-4 xs:px-6 text-black text-nowrap cursor-default">
      <FormattedMessage id="OrderForm.MoreDetailsForm.moreDetails"/>
    </motion.h1>
    <motion.div
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 bg-formBgColor-firstChild rounded-2xl"
    >

      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default truncate pr-2"><FormattedMessage id="OrderForm.MoreDetailsForm.pickupTime"/></h1>

      <DatePickerOrder />
      <Dropdown name={intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfGoods' })} options={typesOfGoods} selectedOption={selectedOption3} setSelectedOption={handleSelectOption3}/>
      <div className="h-0 w-full relative"><p className="text-red-500 absolute -translate-y-2/3 text-sm overflow-hidden pr-5 font-normal pl-5 truncate">{formErrors3.goods}</p></div>
      <Dropdown name={intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.totalMass' })} options={massOptions} selectedOption={selectedOption4} setSelectedOption={handleSelectOption4}/>
      <div className="h-0 w-full relative"><p className="text-red-500 absolute -translate-y-2/3 text-sm overflow-hidden pr-5 font-normal pl-5 truncate">{formErrors3.mass}</p></div>

      <h1 className={`text-sm font-bold pl-5 text-black text-nowrap cursor-default flex flex-row ${formErrors3.mass == ""? '':'pt-3'}`}>
        <FormattedMessage id="OrderForm.MoreDetailsForm.dimensions"/>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl my-4">

        <div className="relative self-center sm:grow w-full">
          <input
            id="orderLength1"
            name="orderLength1"
            type="text"
            value={length}
            onChange={(e)=>{
              setLength(parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0);
              validate(3,parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0,width, height, selectedOption3, selectedOption4);}}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength1"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.length"/>
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength2"
            name="orderLength2"
            type="text"
            value={width}
            onChange={(e)=>{
              setWidth(parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0);
              validate(3,length,parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0, height, selectedOption3, selectedOption4);}}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength2"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.width"/>
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement1}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement1}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength3"
            name="orderLength3"
            type="text"
            value={height}
            onChange={(e)=>{
              setHeight(parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0);
              validate(3,length,width,parseFloat(e.target.value)? (parseFloat(e.target.value) > 50 ? 50 : (parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))) : 0, selectedOption3, selectedOption4);}}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength3"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.height"/>
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement2}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement2}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

      </div>
      <div className="h-0 w-full relative"><p className="text-red-500 absolute -translate-y-2/3 text-sm overflow-hidden pr-5 font-normal pl-5 truncate">{formErrors3.dimensions}</p></div>
    </motion.div>

  </div>
}

export default MoreDetailsForm;