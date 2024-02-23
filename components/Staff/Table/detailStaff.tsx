import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
interface Staffdetail {
  number: string;
  staffName: string;
  staffAccountName: string;
  staffKey: string;
  staffRole: string;
  staffPhone: string;
  staffKPI: number;
  staffSalary: number;
  staffSalaryPaid: number;
  staffDeposit: number;
  staffActive: boolean;
}

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: Staffdetail;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial }) => {
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
            <FormattedMessage id="Staff Information" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white place-content-center">
          <div className="grid grid-cols-2 ">
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-bold text-base">
                    <FormattedMessage id="Staff Image" />
                  </div>
                  <div>
                    <User className="w-20 h-20  md:w-80 md:h-80" />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="font-bold text-base">
                    <FormattedMessage id="Staff ID" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.number}
                      onChange={(e) =>
                        setData({ ...data, number: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.number}</div>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className=" font-bold text-base ">
                    <FormattedMessage id="Staff Name" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffName}
                      onChange={(e) =>
                        setData({ ...data, staffName: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffName}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Account" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffAccountName}
                      onChange={(e) =>
                        setData({ ...data, staffAccountName: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffAccountName}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Position" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffRole}
                      onChange={(e) =>
                        setData({ ...data, staffRole: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffRole}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Phone" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffPhone}
                      onChange={(e) =>
                        setData({ ...data, staffPhone: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffPhone}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    Địa chỉ nhân viên
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffPhone}
                      onChange={(e) =>
                        setData({ ...data, staffPhone: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffPhone}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">Bin</div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffPhone}
                      onChange={(e) =>
                        setData({ ...data, staffPhone: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffPhone}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">Ngân hàng</div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="text"
                      value={data.staffPhone}
                      onChange={(e) =>
                        setData({ ...data, staffPhone: e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffPhone}</div>
                  )}
                </div>

                <div className="flex">
                  <div className="w-1/2 font-bold text-base">KPI</div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffKPI}
                      onChange={(e) =>
                        setData({
                          ...data,
                          staffKPI: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    <div>{data.staffKPI}</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Salary" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffSalary}
                      onChange={(e) =>
                        setData({ ...data, staffSalary: +e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffSalary} vnđ</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Salary Paid" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffSalaryPaid}
                      onChange={(e) =>
                        setData({ ...data, staffSalaryPaid: +e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffSalaryPaid} vnđ</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    <FormattedMessage id="Staff Deposit" />
                  </div>
                  {isEditing ? (
                    <input
                      className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white"
                      type="number"
                      value={data.staffDeposit}
                      onChange={(e) =>
                        setData({ ...data, staffDeposit: +e.target.value })
                      }
                    />
                  ) : (
                    <div>{data.staffDeposit} vnđ</div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold text-base">
                    Trạng thái hoạt động
                  </div>
                  {isEditing ? (
                    <div className="w-1/2 bg-transparent border-b-2 border-[#545e7b] text-white flex flex-row gap-5">
                      <input
                        type="radio"
                        name="staffActive"
                        value={true.toString()} // Convert boolean value to string
                        checked={data.staffActive === true}
                        onChange={(e) =>
                          setData({
                            ...data,
                            staffActive: JSON.parse(e.target.value),
                          })
                        }
                      />
                      Hoạt động
                      <input
                        type="radio"
                        name="staffActive"
                        value={false.toString()}
                        checked={data.staffActive === false}
                        onChange={(e) =>
                          setData({
                            ...data,
                            staffActive: JSON.parse(e.target.value),
                          })
                        }
                      />
                      Đã nghỉ việc
                    </div>
                  ) : (
                    <div>{data.staffActive ? "Hoạt động" : "Đã nghỉ việc"}</div>
                  )}
                </div>
              </div>
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

export default DetailStaff;
