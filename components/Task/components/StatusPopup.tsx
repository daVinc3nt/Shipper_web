import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";
import { ShippersOperation } from "@/TDLib/tdlogistics";

interface StatusPopupProps {
    onClose: () => void;
    dataInitial: any;
    reloadData: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({ onClose, dataInitial, reloadData }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState(0);
    const intl = useIntl()

    const shippersOperation = new ShippersOperation();

    const confirmingCompletedTaskInfo = {
        id: parseFloat(dataInitial.id)
    };

    const handleSubmitClick = async () => {
        if (data === 1) {
            const confirmed = window.confirm(intl.formatMessage({ id: 'Mission.Status.Alert' }));
            if (confirmed) {
                const response = await shippersOperation.confirmCompletedTask(confirmingCompletedTaskInfo);
                if (response.error) {
                    alert(intl.formatMessage({ id: 'Mission.Detail.Alert3' }));
                } else {
                    reloadData();
                    onClose();
                }
            }
        } else {
            onClose();
        }
    };


    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10 z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backdropFilter: "blur(6px)",
            }}
        >
            <motion.div
                ref={notificationRef}
                className={`relative w-96 bg-white rounded-xl p-3 sm:p-4`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-gray-200 overflow-hidden">
                    <div className="font-bold text-lg sm:text-2xl pb-2 w-full text-center">
                        <FormattedMessage id="Mission.Status.Title" />
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full mb-2 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="mt-4 relative flex flex-col bg-gray-200 bg-clip-border w-full px-10 py-2 rounded-sm gap-1">
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2" onClick={() => setData(0)}>
                        <span className="pr-1"><FormattedMessage id="Mission.Status1" /></span>
                        {data === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2" onClick={() => setData(1)}>
                        <span className="pr-1"><FormattedMessage id="Mission.Status2" /></span>
                        {data === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                </div>

                <div className="w-full flex">
                    <Button
                        className="w-full rounded-lg mt-5 mb-1 py-3 text-[#545e7b] border-[#545e7b] hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                        onClick={handleSubmitClick}
                    >
                        <span><FormattedMessage id="Mission.Status.Button" /></span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StatusPopup;
