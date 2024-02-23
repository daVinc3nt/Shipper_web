import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
interface VehicleData {
  id: string;
  codeAgency: string;
  codeStaff: string;
  role: string;
  GPLX: File;
  maxWeight: string;
  BKS: string;
  Active: boolean;
  nameVehicle: string;
}

interface DetailVehicleProps {
  onClose: () => void;
  dataInitial: VehicleData;
}

const DetailVehicle: React.FC<DetailVehicleProps> = ({
  onClose,
  dataInitial,
}) => {
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
            Thông tin phương tiện
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  bg-[#14141a] p-2 rounded-md text-white place-content-center">
          <div className=" grid grid-cols-2 gap-3 ">
            <div className="flex gap-5">
              <div className="font-bold text-base">Mã đối tác</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.codeAgency}
                  onChange={(e) =>
                    setData({ ...data, codeAgency: e.target.value })
                  }
                />
              ) : (
                <div>{data.codeAgency}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Mã nhân viên</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.codeStaff}
                  onChange={(e) =>
                    setData({ ...data, codeStaff: e.target.value })
                  }
                />
              ) : (
                <div>{data.codeStaff}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Loại công việc</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                />
              ) : (
                <div>{data.role}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Trọng tải tối đa</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.maxWeight}
                  onChange={(e) =>
                    setData({ ...data, maxWeight: e.target.value })
                  }
                />
              ) : (
                <div>{data.maxWeight}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Biển kiểm soát</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.BKS}
                  onChange={(e) => setData({ ...data, BKS: e.target.value })}
                />
              ) : (
                <div>{data.BKS}</div>
              )}
            </div>
            <div className="flex gap-5">
              <div className="font-bold text-base">Tên phương tiện</div>
              {isEditing ? (
                <input
                  className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                  type="text"
                  value={data.nameVehicle}
                  onChange={(e) =>
                    setData({ ...data, nameVehicle: e.target.value })
                  }
                />
              ) : (
                <div>{data.nameVehicle}</div>
              )}
            </div>
            <div className="flex">
              <div className=" font-bold text-base mr-2">
                Trạng thái hoạt động :
              </div>
              {isEditing ? (
                <div className=" bg-transparent font-bold border-b-2 border-[#545e7b] text-white flex flex-row gap-3 ml-2">
                  <input
                    type="radio"
                    name="Active"
                    value={true.toString()} // Convert boolean value to string
                    checked={data.Active === true}
                    onChange={(e) =>
                      setData({
                        ...data,
                        Active: JSON.parse(e.target.value),
                      })
                    }
                  />
                  Hoạt động
                  <input
                    type="radio"
                    name="Active"
                    value={false.toString()}
                    checked={data.Active === false}
                    onChange={(e) =>
                      setData({
                        ...data,
                        Active: JSON.parse(e.target.value),
                      })
                    }
                  />
                  Đã nghỉ việc
                </div>
              ) : (
                <div className="font-bold ">
                  {data.Active ? "Hoạt động" : "Đã nghỉ việc"}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold text-base mb-3">Giấy phép lái xe</div>
            {isEditing ? (
              <input
                className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white mt-3"
                type="file"
                onChange={(e) => setData({ ...data, GPLX: e.target.files[0] })}
              />
            ) : (
              <>
                {typeof data.GPLX === "string" ? (
                  <img src={data.GPLX} alt="" />
                ) : (
                  <img src="placeholder-image.jpg" alt="Placeholder" />
                )}
              </>
            )}
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
              <span className="hidden xs:block">Chỉnh sửa</span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
    bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
    hover:shadow-md"
              onClick={handleSaveClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">Lưu</span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailVehicle;
