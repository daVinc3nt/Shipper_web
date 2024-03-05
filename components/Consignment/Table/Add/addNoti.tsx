import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "../../../Common/dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
import MapNoti from "../MapRender/mapNoti";
import { FormattedMessage, useIntl } from "react-intl";

interface AddNotificationProps {
  onClose: () => void;
}

const AddNotification: React.FC<AddNotificationProps> = ({ onClose }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const intl = useIntl();

  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  const handleInputChange = (key: string, value: string) => {
    setUserData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const postOffices = ['Bưu cục A', 'Bưu cục B', 'Bưu cục C', 'Bưu cục D', 'Bưu cục E', ];

  const provinces = [
    "AGI", "VTB", "BLI", "BGI", "BKA", "BNI", "BTR", "BDU", "BDI", "BPC", 
    "BTN", "CMU", "CBA", "CTH", "DNG", "DLA", "DKN", "DBI", "DNA", "DTP", 
    "GLA", "HGI", "HNA", "HNO", "HTI", "HDU", "HPG", "HAG", "HBI", "HYE", 
    "KHA", "KGI", "KTU", "LCA", "LSN", "LCI", "LDG", "LAN", "NDH", "NAN", 
    "NBI", "NTH", "PTH", "PYE", "QBI", "QNA", "QNG", "QNH", "QTR", "STG", 
    "SLA", "TNI", "TBH", "TNG", "THA", "HCM", "TTH", "TGG", "TVH", "TQU", 
    "VLG", "VPH", "YBA"
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {modalIsOpen && <MapNoti onClose={closeModal} type={type}/>}
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? 'animate-shake' : ''}`}
        initial={{ scale: 0 }} animate={{ scale: isVisible ? 1 : 0 }} exit={{ scale: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center"><FormattedMessage id="Consignment.Add.Title"/></div>
          <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
            <IoMdClose className="w-5/6 h-5/6"/>
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-[#14141a] p-2 rounded-md text-white">
          <div className="w-[98%] sm:w-10/12">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="Consignment.Add.SubTitle1"/></h1>
            <div className="w-full flex gap-2">
              <CustomDropdown
                label={intl.formatMessage({ id: 'Consignment.Add.Option1' })} options={['Đối tác A', 'Đối tác B', 'Đối tác C']}
                selectedOption={userData.partnerTransporters}
                onSelectOption={(option) => handleInputChange('partnerTransporters', option)}
              />
              <CustomDropdown
                label={intl.formatMessage({ id: 'Consignment.Add.Option2' })}  options={['Nhân viên A', 'Nhân viên B', 'Nhân viên C']}
                selectedOption={userData.staffTransporters}
                onSelectOption={(option) => handleInputChange('staffTransporters', option)}
              />
            </div>
          </div>
          
          <div className="w-2/3 sm:w-1/2 mt-6">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="Consignment.Add.SubTitle2"/></h1>
            <div className="w-full flex gap-2">
              <CustomDropdown
                label={intl.formatMessage({ id: 'Consignment.Add.Option3' })}  options={provinces}
                selectedOption={userData.startPoint}
                onSelectOption={(option) => handleInputChange('startPoint', option)}
              />
              <div className="pt-2">-</div>
              <CustomDropdown
                label={intl.formatMessage({ id: 'Consignment.Add.Option4' })}  options={provinces}
                selectedOption={userData.endPoint}
                onSelectOption={(option) => handleInputChange('endPoint', option)}
              />
            </div>
          </div>

          <div className="w-[98%] sm:w-10/12 mt-6">
            <h1 className="font-semibold pb-2 text-center"><FormattedMessage id="Consignment.Add.SubTitle3"/></h1>
            <div className="w-full flex gap-2 flex-col">
              <div className="relative">
                <Button className="z-40 absolute right-0 w-10 border-l border-gray-600 rounded-r h-10"
                onClick={()=>openModal("source")}>
                  <FaMapMarkedAlt className="text-gray-300 w-4 h-4 mr-0.4"/>
                </Button>
                <CustomDropdown
                  label={intl.formatMessage({ id: 'Consignment.Add.Option5' })}  options={postOffices}
                  selectedOption={userData.startOffice}
                  onSelectOption={(option) => handleInputChange('startOffice', option)}
                />
              </div>
              <div className="relative">
                <Button className="z-40 absolute right-0 w-10 border-l border-gray-600 rounded-r h-10"
                onClick={()=>openModal("destination")}>
                  <FaMapMarkedAlt className="text-gray-300 w-4 h-4 mr-0.4"/>
                </Button>
                <CustomDropdown
                  label={intl.formatMessage({ id: 'Consignment.Add.Option6' })}  options={postOffices}
                  selectedOption={userData.endOffice}
                  onSelectOption={(option) => handleInputChange('endOffice', option)}
                />
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
        bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md">
          <span className="hidden xs:block"><FormattedMessage id="Consignment.Add.Button"/></span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AddNotification;
