"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { OrdersOperation, UpdatingOrderImageCondition } from "@/TDLib/tdlogistics";
import Dropzone from "./DropZone";

interface DetailPopupProps {
    onClose: () => void;
    dataInitial: any,
    reloadData: () => void;
}

const DetailPopup: React.FC<DetailPopupProps> = ({ onClose, reloadData, dataInitial }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [files, setFiles] = useState([])
    const intl = useIntl();
    const ordersOperation = new OrdersOperation();
    const handleSubmit = async () => {

        if (!files) {
            alert('Please select at least one file.');
            return;
        }
        let updatingOrderCondition: UpdatingOrderImageCondition = {
            order_id: dataInitial.order_id,
            type: "send",
        };

        let updatingOrderInfo = {
            files: files
        }

        try {
            const orders = new OrdersOperation();
            const result = await orders.updateImage(updatingOrderInfo, updatingOrderCondition);
            console.log(result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10 z-50 py-16`}
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
                className={`relative w-[98%] sm:w-9/12 bg-white rounded-xl p-3 sm:p-4 h-full flex flex-col`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative items-center justify-center flex-col flex w-full border-b-2 border-gray-200">
                    <div className="font-bold text-lg sm:text-2xl pb-2 w-full text-center">
                        Thêm ảnh đơn hàng
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full pb-1 sm:pb-0 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="grow mt-4 relative flex bg-gray-200 bg-clip-border w-full overflow-y-scroll p-4 rounded-sm">
                    <Dropzone className="h-32 w-full bg-white rounded-xl flex justify-center outline-gray-400 outline-dashed" files={files} setFiles={setFiles} />
                </div>

                <div className="w-full flex h-16 sm:h-[72px]">
                    <Button
                        className="w-full rounded-lg mt-4 sm:mt-5 mb-1 py-3 border-green-400 hover:border-green-600 text-green-500 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex gap-2"
                        onClick={handleSubmit}
                    >
                        <FaPen />
                        <span className="xs:block">Xác nhận thêm ảnh</span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DetailPopup;
