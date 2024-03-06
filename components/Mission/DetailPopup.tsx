"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";

interface DetailPopupProps {
    onClose: () => void;
    dataInitial: any;
}

const DetailPopup: React.FC<DetailPopupProps> = ({ onClose, dataInitial }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState(dataInitial);
    const [originalData, setOriginalData] = useState(dataInitial);
    const [isEditing, setIsEditing] = useState(false);
    const [missing, setMissing] = useState({
        height: false,
        length: false,
        width: false,
        mass: false,
    });
    const intl = useIntl();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleStateChange = (newState: number) => {
        if (originalData.state == 0) {
            setData({ ...data, state: newState });
        } else if (originalData.state == 1 && newState >= 1) {
            setData({ ...data, state: newState });
        } else if (originalData.state == 2 && newState >= 2) {
            setData({ ...data, state: newState });
        }
    };

    const handleSaveClick = () => {
        let tempMissing = {
            height: false,
            length: false,
            width: false,
            mass: false,
        };

        if (data.height === "" || data.height === "0") tempMissing.height = true;
        if (data.length === "" || data.length === "0") tempMissing.length = true;
        if (data.width === "" || data.width === "0") tempMissing.width = true;
        if (data.mass === "" || data.mass === "0") tempMissing.mass = true;

        setMissing(tempMissing);

        const anyMissing = Object.values(tempMissing).some((value) => value);
        if (anyMissing) {
            alert(intl.formatMessage({ id: "Mission.Detail.Alert" }));
        } else {
            setIsEditing(false);
        }
    };

    useEffect(() => {
        let tempMissing: {
            height: boolean;
            length: boolean;
            width: boolean;
            mass: boolean;
        } = {
            height: false,
            length: false,
            width: false,
            mass: false,
        };

        if (
            data.height === "0" ||
            data.length === "0" ||
            data.width === "0" ||
            data.mass === "0"
        ) {
            if (data.height === "0" || data.height === "") tempMissing = { ...tempMissing, height: true };
            if (data.length === "0" || data.length === "") tempMissing = { ...tempMissing, length: true };
            if (data.width === "0" || data.width === "") tempMissing = { ...tempMissing, width: true };
            if (data.mass === "0" || data.mass === "") tempMissing = { ...tempMissing, mass: true };
        }

        setMissing(tempMissing);
    }, [data]);

    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setData({ ...data, [name]: value });
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
                className={`relative w-[98%] sm:w-9/12 bg-white rounded-xl p-4`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-gray-200 overflow-hidden">
                    <div className="font-bold text-lg sm:text-2xl pb-2 w-full text-center">
                        <FormattedMessage id="Mission.Detail.Title" />
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full mb-2 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="h-96 mt-4 relative flex bg-gray-200 bg-clip-border w-full overflow-y-scroll p-4 rounded-sm">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info1" />:</div>
                            <div className="w-1/2 pl-2">{data.order_id}</div>
                        </div>
                        {/* <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info2" />:</div>
                            {isEditing ? (
                                <select
                                    className="w-1/2 pl-1 rounded"
                                    value={data.state.toString()}
                                    onChange={(e) => { handleStateChange(parseFloat(e.target.value)) }}
                                >
                                    <option value={"2"} key={"2"}><FormattedMessage id="Mission.Status3" /></option>
                                    {originalData.state !== 2 && <option value={"1"} key={"1"}><FormattedMessage id="Mission.Status2" /></option>}
                                    {originalData.state == 0 && <option value={"0"} key={"0"}><FormattedMessage id="Mission.Status1" /></option>}
                                </select>
                            ) : (
                                <div className="w-1/2 pl-2">{data.state === 2 ? intl.formatMessage({ id: "Mission.Status3" }) : (data.state === 1 ? intl.formatMessage({ id: "Mission.Status2" }) : intl.formatMessage({ id: "Mission.Status1" }))}</div>
                            )}
                        </div> */}
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base">Tên người gửi:</div>
                            <div className="w-1/2 pl-2">{data.name_sender}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                            <div className="w-1/2 pl-2">{`${data.detail_source}, ${data.ward_source}, ${data.district_source}, ${data.province_source}`}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base">Số điện thoại người gửi:</div>
                            <div className="w-1/2 pl-2">{data.phone_number_sender}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base">Tên người nhận:</div>
                            <div className="w-1/2 pl-2">{data.name_receiver}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                            <div className="w-1/2 pl-2">{`${data.detail_dest}, ${data.ward_dest}, ${data.district_dest}, ${data.province_dest}`}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base">Số điện thoại người nhận:</div>
                            <div className="w-1/2 pl-2">{data.phone_number_receiver}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base">Phí:</div>
                            <div className="w-1/2 pl-2">{parseFloat(data.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info4" />:</div>
                            <div className="w-1/2 pl-2">{parseFloat(data.COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info5" />:</div>
                            {isEditing ? (
                                <input
                                    className={`w-1/2 pl-2 rounded ${missing.mass ? "border-2 border-red-500" : ""}`}
                                    type="text"
                                    name="mass"
                                    value={data.mass}
                                    onChange={handleNumericInputChange}
                                />
                            ) : (
                                <div className="w-1/2 pl-2">{data.mass}</div>
                            )}
                        </div>
                        <div className="flex ">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info6" />:</div>
                            {isEditing ? (
                                <input
                                    className={`w-1/2 pl-2 rounded ${missing.length ? "border-2 border-red-500" : ""}`}
                                    type="text"
                                    name="length"
                                    value={data.length}
                                    onChange={handleNumericInputChange}
                                />
                            ) : (
                                <div className="w-1/2 pl-2">{data.length}</div>
                            )}
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info7" />:</div>
                            {isEditing ? (
                                <input
                                    className={`w-1/2 pl-2 rounded ${missing.width ? "border-2 border-red-500" : ""}`}
                                    type="text"
                                    name="width"
                                    value={data.width}
                                    onChange={handleNumericInputChange}
                                />
                            ) : (
                                <div className="w-1/2 pl-2">{data.width}</div>
                            )}
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info8" />:</div>
                            {isEditing ? (
                                <input
                                    className={`w-1/2 pl-2 rounded ${missing.height ? "border-2 border-red-500" : ""}`}
                                    type="text"
                                    name="height"
                                    value={data.height}
                                    onChange={handleNumericInputChange}
                                />
                            ) : (
                                <div className="w-1/2 pl-2">{data.height}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full flex">
                    {!isEditing ? (
                        <Button
                            className="w-full rounded-lg mt-5 mb-1 py-3 text-[#545e7b] border-[#545e7b] hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                            onClick={handleEditClick}
                        >
                            <FaPen />
                            <span><FormattedMessage id="Mission.Detail.Button1" /></span>
                        </Button>
                    ) : (
                        <Button
                            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-400 hover:border-green-600 text-green-500 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                            onClick={handleSaveClick}
                        >
                            <FaPen className="xs:mr-2" />
                            <span className="xs:block"><FormattedMessage id="Mission.Detail.Button2" /></span>
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DetailPopup;
