import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
interface Order {
  number: string;
  postName: string;
  postMail: string;
  postIncome: string;
  postRate: Date;
  postPhone: string;
  postAddress: string;
  postBankAccount: string;
  postBankName: string;
}

interface DetailOrderProps {
  onClose: () => void;
  dataInitial: Order;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(dataInitial);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
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
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-[#14141a] rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Thông tin đơn hàng
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  bg-[#14141a] p-2 rounded-md text-white place-content-center">
          <div className="grid grid-cols-2">
            <div className="flex gap-5">
              <div className="font-bold text-base">Tên bưu cục-đại lý:</div>

              <div>{data.postName}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Số điện thoại:</div>

              <div>{data.postPhone}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Email:</div>

              <div>{data.postMail}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Địa chỉ:</div>

              <div>{data.postAddress}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Giá trị đơn hàng</div>

              <div>{data.postIncome}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Ngày giao</div>

              <div>{new Date(data.postRate).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Ngày nhận</div>
              <div>{new Date(data.postRate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailOrder;
