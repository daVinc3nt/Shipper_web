import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose, IoIosBarcode } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import EditableField from "./editField";
import { FormattedMessage, useIntl } from "react-intl";
import { IoAddCircleOutline } from "react-icons/io5";
import AddOrders from "./AddOrders/addOrdersNoti";

interface Order {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  status: number;
}

interface DetailNotificationProps {
  onClose: () => void;
  dataInitial: {
    consignmentCode?: string;
    barcode?: string;
    deliveryManName?: string;
    licensePlate?: string;
    container?: string;
    consState?: number;
    consCode?: string;
    orders?: Order[];
    carrierName?: string;
    mass?: number;
    id?: number;
  };
}

const DetailNotification: React.FC<DetailNotificationProps> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [delMulti, setDelMulti] = useState(false);
  const [isDataModified, setIsDataModified] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const intl = useIntl();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (data !== dataInitial) {
      setIsDataModified(true);
    } else {
      setIsDataModified(false);
    }
  }, [data, dataInitial]);

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  const handleCancelChanges = () => {
    setData(dataInitial);
    setSelectedOrders([]);
    setDelMulti(false);
    setIsDataModified(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleDeleteOrder = () => {
    if (delMulti) {
      if (selectedOrders.length != 0){
        const updatedOrders = data.orders.filter((order) => !selectedOrders.includes(order.orderId));
        setData({ ...data, orders: updatedOrders });
        setSelectedOrders([]);
      }
      setDelMulti(false);
    } else {
      setDelMulti(true);
    }
  };

  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((selectedId) => selectedId !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  const addOrders = (newOrders: Order[]) => {
    const filteredNewOrders = newOrders.filter(newOrder => {
      return !data.orders.some(existingOrder => existingOrder.orderId === newOrder.orderId);
    });
    const updatedOrders = [...data.orders, ...filteredNewOrders];
    setData({ ...data, orders: updatedOrders });
  };

  const handleEditClick = () => {
    dataInitial = data;
    setIsDataModified(false);
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)"
      }}
    >
      {modalIsOpen && <AddOrders onClose={closeModal} addOrders={addOrders}/>}
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center"><FormattedMessage id="Consignment.Info.Title"/></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white">
          <div className="flex flex-col">
            <div className="text-center text-lg sm:text-xl font-semibold"><FormattedMessage id="Consignment.Info.Info1"/>: {data.consignmentCode}</div>
            <div className={`flex flex-col xl:flex-row justify-between pt-2 pl-2`}>
              <div className="w-full mr-2">
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info2"/>:</span>
                  <EditableField data={data.barcode} />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info3"/>:</span>
                  <EditableField data={data.mass} />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info4"/>:</span>
                  <EditableField data={data.container} />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info5"/>:</span>
                  <EditableField data={data.carrierName} />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info6"/>:</span>
                  <EditableField data={data.deliveryManName} />
                </div>
                <div className="flex items-center">
                  <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info7"/>:</span>
                  <EditableField data={data.licensePlate} />
                </div>
              </div>
            </div>
            <div className="text-center text-lg mt-2">
              <FormattedMessage id="Consignment.Info.Info8"/>:{" "}
              {(() => {
                let statusLabel = "";
                let statusColor = "";
                const intl = useIntl(); 

                switch (data.consState) {
                  case 1:
                    statusLabel = intl.formatMessage({ id: 'Consignment.Status.Ongoing' });
                    statusColor = "text-yellow-600";
                    break;
                  case 2:
                    statusLabel = intl.formatMessage({ id: 'Consignment.Status.Pending' });
                    statusColor = "text-gray-500";
                    break;
                  case 3:
                    statusLabel = intl.formatMessage({ id: 'Consignment.Status.Done' });
                    statusColor = "text-green-500";
                    break;
                  case 4:
                    statusLabel = intl.formatMessage({ id: 'Consignment.Status.Cancel' });
                    statusColor = "text-red-500";
                    break;
                  default:
                    statusLabel = "Unknown";
                }

                return <span className={`${statusColor} font-semibold text-xl`}>{statusLabel}</span>;
              })()}
            </div>
            <div className="w-full flex">
              <Button
                className={` self-start h-10 rounded-lg mt-5 mb-1 p-3 border-red-700 hover:bg-red-700 text-red-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md mr-2 ${delMulti? 'outline outline-red-700':''}`}
                onClick={() => handleDeleteOrder()}
              >
                <FaTrash className="hidden sm:block mr-2" />
                <span className="block">{delMulti? <FormattedMessage id="Consignment.Info.Confirm"/>: <FormattedMessage id="Consignment.Info.Delete1"/>}</span>
              </Button>
              <div className="grow flex justify-end">
                <Button
                  className={`h-10 rounded-lg mt-5 mb-1 p-3 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md mr-2`}
                  onClick={openModal}
                >
                  <IoAddCircleOutline className="hidden sm:block mr-2 h-5 w-5" />
                  <span className="block"><FormattedMessage id="Consignment.Info.Add1"/></span>
                </Button>
                <Button
                  className={`h-10 rounded-lg mt-5 mb-1 p-3 border-green-700 hover:bg-green-700 text-green-500
                  bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                  hover:shadow-md mr-2`}
                  onClick={() => {}}
                >
                  <IoIosBarcode className="hidden sm:block mr-2 h-5 w-5" />
                  <span className="block"><FormattedMessage id="Consignment.Info.Add2"/></span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-2 grid lg:grid-cols-2 gap-2">
            <AnimatePresence initial={false}>
              {data.orders.map((order: Order) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border border-[#545e7b] rounded-lg p-2 bg-[#1a1b23] flex flex-col ${
                    selectedOrders.includes(order.orderId) ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => {delMulti? handleCheckboxChange(order.orderId) : {}}}
                >
                  <div className="text-center font-semibold pb-2">ID: {order.orderId}</div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info9"/>:</span>
                    <EditableField data={order.mass} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info10"/>:</span>
                    <EditableField data={order.length} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info11"/>:</span>
                    <EditableField data={order.width} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info12"/>:</span>
                    <EditableField data={order.height} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info13"/>:</span>
                    <EditableField data={order.pickupLocation} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info14"/>:</span>
                    <EditableField data={order.deliveryLocation} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info15"/>:</span>
                    <EditableField data={order.fee} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">+ <FormattedMessage id="Consignment.Info.Info16"/>:</span>
                    <EditableField data={order.cod} />
                  </div>
                  <div className="text-center">
                    <FormattedMessage id="Consignment.Info.Info17"/>:{" "}
                    {(() => {
                      let statusLabel = "";
                      let statusColor = "";

                      switch (order.status) {
                        case 1:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Ongoing' });
                          statusColor = "text-yellow-600";
                          break;
                        case 2:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Done' });
                          statusColor = "text-green-500";
                          break;
                        case 3:
                          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Cancel' });
                          statusColor = "text-red-500";
                          break;
                        default:
                          statusLabel = "Unknown";
                      }

                      return <span className={`${statusColor} font-semibold`}>{statusLabel}</span>;
                    })()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {isDataModified && <Button
            className={`w-full rounded-lg mt-5 mb-1 py-3 ${isDataModified ? 'border-orange-500 hover:bg-orange-500 text-orange-500' : 'border-red-700 hover:bg-red-700 text-red-500'}
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md mr-2`}
            onClick={isDataModified ? handleCancelChanges : ()=>{}}
          >
            <RiArrowGoBackFill className="xs:mr-2 mt-[0.3px] " />
            <span className="hidden xs:block"><FormattedMessage id="Consignment.Info.CancelEdit"/></span>
          </Button>
          }
          <Button
            className={`${isDataModified ? 'w-full' : 'w-1/2'} px-2 rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md`}
            onClick={isDataModified ? handleEditClick : handleClose}
          >
            {isDataModified ? (
              <>
                <FaPen className="xs:mr-2" />
                <span className="hidden xs:block"><FormattedMessage id="Consignment.Info.SaveEdit"/></span>
              </>
            ) : (
              <>
                <FaPen className="xs:mr-2" />
                <span className="hidden xs:block"><FormattedMessage id="Consignment.Info.Submit"/></span>
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailNotification;
