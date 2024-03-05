import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";

interface OrderNotificationProps {
  onClose: () => void; // Callback function to close the notification window
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ onClose }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50 inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={notificationRef}
        className="relative max-w-80 h-44 xs:h-40 bg-white rounded-xl p-4 border-2 border-red-500"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-gray-600 text-xl font-bold mb-2"><FormattedMessage id="OrderForm.OrderNotification.noti"/></h2>
        <p className="text-gray-600"><FormattedMessage id="OrderForm.OrderNotification.detail"/></p>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-5 left-5 mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-300 text-black rounded"
        >
        <Link href="/" >
        <FormattedMessage id="OrderForm.OrderNotification.backHome"/>
        </Link>
        </motion.button>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-5 right-5 mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={handleClose}
        >
          <FormattedMessage id="OrderForm.OrderNotification.closeBtn"/>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OrderNotification;