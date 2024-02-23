import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
interface Postdetail {
  number: string;
  postName: string;
  postMail: string;
  postIncome: string;
  postRate: string;
  postPhone: string;
  postAddress: string;
  postBankAccount: string;
  postBankName: string;
}

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: Postdetail;
}

const DetailPost: React.FC<DetailStaffProps> = ({ onClose, dataInitial }) => {
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
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    // Gửi API về server để cập nhật dữ liệu
    // Sau khi hoàn thành, có thể tắt chế độ chỉnh sửa
    setIsEditing(false);
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
            Thông tin bưu cục-đại lý
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
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postName}
                  onChange={(e) =>
                    setData({ ...data, postName: e.target.value })
                  }
                />
              ) : (
                <div>{data.postName}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Số điện thoại:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postPhone}
                  onChange={(e) =>
                    setData({ ...data, postPhone: e.target.value })
                  }
                />
              ) : (
                <div>{data.postPhone}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Email:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postMail}
                  onChange={(e) =>
                    setData({ ...data, postMail: e.target.value })
                  }
                />
              ) : (
                <div>{data.postMail}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Địa chỉ:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postAddress}
                  onChange={(e) =>
                    setData({ ...data, postAddress: e.target.value })
                  }
                />
              ) : (
                <div>{data.postAddress}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Doanh thu:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postIncome}
                  onChange={(e) =>
                    setData({ ...data, postIncome: e.target.value })
                  }
                />
              ) : (
                <div>{data.postIncome}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Tỉ lệ hoa hồng:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postRate}
                  onChange={(e) =>
                    setData({ ...data, postRate: e.target.value })
                  }
                />
              ) : (
                <div>{data.postRate}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Tên ngân hàng:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postBankName}
                  onChange={(e) =>
                    setData({ ...data, postBankName: e.target.value })
                  }
                />
              ) : (
                <div>{data.postBankName}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Số tài khoản:</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.postBankAccount}
                  onChange={(e) =>
                    setData({ ...data, postBankAccount: e.target.value })
                  }
                />
              ) : (
                <div>{data.postBankAccount}</div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Edit" />
              </span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                <FormattedMessage id="Save" />
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPost;
