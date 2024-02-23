import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import EditField from "./editField";
import {FormattedMessage, useIntl } from "react-intl"
interface Order {
  onClose: () => void;
  dataInitial: {
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
}


const DetailNotification: React.FC<Order> = ({ onClose, dataInitial }) => {
  const intl =useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);


  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
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
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-6/12 bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">Thông tin lô hàng</div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll text-2xl mt-4 justify-center items-center no-scrollbar flex flex-col  p-2 rounded-md text-white">
            <AnimatePresence initial={false}>
                <motion.div
                  key={data.orderId}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={` p-2  flex flex-col`}
                >
                  <div className="text-center font-semibold pb-2">ID: {data.orderId}</div>
                  <span className="mr-2">+ <FormattedMessage id="order.mass"/> :</span>
                  <EditField inputlen="100" data={data.mass} setData={(value) => setData({ ...data, mass: Number(value) })} type="text" />
                  <div className="flex flex-col sm:flex-row whitespace-nowrap overflow-hidden justify-between">
                    <div className="pr-4">
                      <span className="mr-2">+ <FormattedMessage id="order.length"/>:</span>
                      <EditField inputlen={"100"} data={data.length} setData={(value) => setData({ ...data, length: Number(value) })} type="text" />
                    </div>
                    <div className="pr-4">
                      <span className="mr-2">+ <FormattedMessage id="order.width"/>:</span>
                      <EditField inputlen={"100"} data={data.width} setData={(value) => setData({ ...data, width: Number(value) })} type="text" />
                    </div>
                    <div className="pr-4">
                      <span className="mr-2">+ <FormattedMessage id="order.height"/>:</span>
                      <EditField inputlen={"100"} data={data.height} setData={(value) => setData({ ...data, height: Number(value) })} type="text" />
                    </div>
                  </div>
                  <div>+ <FormattedMessage id="order.pickuplocation"/>: {<EditField inputlen={"900"} data={data.pickupLocation} setData={(value) => setData({ ...data, pickupLocation: value.toString() })} type="text" />}</div>
                  <div>+ <FormattedMessage id="order.receive"/>: {<EditField inputlen={"900"} data={data.deliveryLocation} setData={(value) => setData({ ...data,  deliveryLocation: value.toString() })} type="text" />}</div>
                  <div className="flex flex-col sm:flex-row gap-6">
                  <div>+ <FormattedMessage id="order.fee"/>: {<EditField inputlen={"100"} data={data.fee} setData={(value) => setData({ ...data,  fee: Number(value) })} type="text" />}</div>
                  <div>+ COD: {<EditField inputlen={"100"} data={data.cod} setData={(value) => setData({ ...data,  cod: Number(value) })} type="text" />}</div>
                  </div>
                  <div className="text-center">
                  <FormattedMessage id="order.status"/>:{" "}
                    {(() => {
                      let statusLabel = "";
                      let statusColor = "";

                      switch (data.status) {
                        case 1:
                          statusLabel = intl.formatMessage({ id: 'order.status.ongoing' });
                          statusColor = "text-yellow-600";
                          break;
                        case 2:
                          statusLabel = intl.formatMessage({ id: 'order.status.pending' });
                          statusColor = "text-gray-500";
                          break;
                        case 3:
                          statusLabel = intl.formatMessage({ id: 'order.status.done' });
                          statusColor = "text-green-500";
                          break;
                        case 4:
                          statusLabel = intl.formatMessage({ id: 'order.status.cancel' });
                          statusColor = "text-red-500";
                          break;
                        default:
                          statusLabel = "Unknown";
                      }
                      return <span className={`${statusColor} font-semibold`}>{statusLabel}</span>;
                    })()}
                  </div>
                </motion.div>
            </AnimatePresence>
        </div>
        <div className="w-full flex">
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-red-700 hover:bg-red-700 text-red-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md mr-2"
          >
            <FaTrash className="xs:mr-2" />
            <span className="hidden xs:block">Xóa lô hàng</span>
          </Button>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
          >
            <FaPen className="xs:mr-2" />
            <span className="hidden xs:block">Lưu chỉnh sửa</span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailNotification;