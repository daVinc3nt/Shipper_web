import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import MapExport from "./MapExport";
import { FormattedMessage } from "react-intl";

interface MapNotificationProps {
  onClose: () => void;
  type: string;
}

const MapNotification: React.FC<MapNotificationProps> = ({ onClose, type }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const [userData, setUserData] = useState({
    partnerTransporters: '',
    staffTransporters: '',
    startPoint: '', endPoint: '',
    startOffice: '', endOffice: ''
  });

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
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b] p-4`}
      initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-full h-full bg-gray-300 rounded-xl overflow-y-auto ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }} animate={{ scale: isVisible ? 1 : 0 }} exit={{ scale: 0 }} transition={{ duration: 0.5 }}
      >
        <MapExport type={type}/>
        
        <Button className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#14141a] outline outline-white hover:bg-gray-700" onClick={handleClose}>
            <IoMdClose className="w-5 h-5 text-white" />
        </Button>
        <div className="absolute bottom-4 w-full px-4 flex justify-center">
            <div className="h-full w-1/2 bg-[#14141a] rounded-lg">
                <Button className="w-full rounded-lg py-3 border-white hover:bg-gray-700 text-white
                bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md">
                <FormattedMessage id="Consignment.Add.Submit"/>
                </Button>
            </div>
        </div>
        
      </motion.div>
    </motion.div>
  );
};

export default MapNotification;
