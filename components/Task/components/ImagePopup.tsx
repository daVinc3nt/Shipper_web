"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { OrdersOperation, UpdatingOrderImageCondition } from "@/TDLib/tdlogistics";
import Dropzone from "./DropZone";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

interface DetailPopupProps {
    onClose: () => void;
    dataInitial: any,
    reloadData: () => void;
}

const DetailPopup: React.FC<DetailPopupProps> = ({ onClose, reloadData, dataInitial }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [files, setFiles] = useState([])
    const [option, setOption] = useState<null | number>(0);
    const [enable, setEnable] = useState(false);
    const orders = new OrdersOperation();
    const handleSubmit = async () => {

        if (!files) {
            alert('Please select at least one file.');
            return;
        }
        let updatingOrderCondition: UpdatingOrderImageCondition = {
            order_id: dataInitial.order_id,
            type: option == 1 ? "send" : "receive",
        };

        let updatingOrderInfo = {
            files: files
        }
        if (enable) {
            try {
                const result = await orders.updateImage(updatingOrderInfo, updatingOrderCondition);
                setEnable(!enable)
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

    };

    useEffect(() => {
        setEnable(false)
        const fetchImages = async () => {
            if (option !== 0) {
                try {
                    const condition: UpdatingOrderImageCondition = {
                        order_id: dataInitial.order_id,
                        type: option == 1 ? "send" : "receive"
                    };
                    const urls = await orders.getImage(condition);
                    if (urls.length == 2) setEnable(false)
                    else setEnable(true)
                } catch (error) {
                    console.error("Error fetching images:", error);
                }
            }
        };

        fetchImages();
    }, [option]);

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
                        <FormattedMessage id="Mission.AddImage.Title" />
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full pb-1 sm:pb-0 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="flex flex-col grow mt-4 gap-2 relative bg-gray-200 bg-clip-border w-full overflow-y-scroll p-4 pt-2 rounded-sm">
                    <div className="flex w-full flex-col sm:flex-row place-items-center ">
                        <Button className="flex items-center rounded-xl p-2 w-full" onClick={() => setOption(1)}>
                            {option === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1"><FormattedMessage id="Mission.AddImage.Button1" /></span>
                        </Button>
                        <div className="text-sm text-center w-40">&#8212; <FormattedMessage id="Mission.AddImage.Or" /> &#8212;</div>
                        <Button className="flex items-center rounded-xl w-full p-2" onClick={() => setOption(2)}>
                            {option === 2 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1"><FormattedMessage id="Mission.AddImage.Button2" /></span>
                        </Button>
                    </div>

                    {((option === 1 || option === 2) && enable) && <Dropzone className="h-32 w-full bg-white rounded-xl flex justify-center outline-gray-400 outline-dashed" files={files} setFiles={setFiles} />}
                    {((option === 1 || option === 2) && !enable) && <div className="text-center p-2 text-black"><FormattedMessage id="Mission.AddImage.Notice" /></div>}
                </div>

                <div className="w-full flex h-16 sm:h-[72px]">
                    <Button
                        className="w-full rounded-lg mt-4 sm:mt-5 mb-1 py-3 border-green-400 hover:border-green-600 text-green-500 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex gap-2"
                        onClick={handleSubmit}
                    >
                        <FaPen />
                        <span className="xs:block"><FormattedMessage id="Mission.AddImage.Button3" /></span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DetailPopup;
