"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { OrdersOperation, UpdatingOrderImageCondition } from "@/TDLib/tdlogistics";
import Carousel from "react-multi-carousel";
import Image from 'next/image'
import { TbChevronsRight, TbChevronsLeft } from "react-icons/tb";
import "react-multi-carousel/lib/styles.css";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ImageView from "./ImageFull";

interface UpdatingOrderCondition {
    order_id: string,
}

interface UpdatingOrderInfo {
    mass: number,
    height: number,
    width: number,
    length: number,
    COD: number,
    status_code: number,
}
interface DetailPopupProps {
    onClose: () => void;
    dataInitial: any;
    reloadData: () => void;
}

const DetailPopup: React.FC<DetailPopupProps> = ({ onClose, dataInitial, reloadData }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState(dataInitial);
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrls2, setImageUrls2] = useState<string[]>([]);
    const [option, setOption] = useState<null | number>(0);
    const [errors, setErrors] = useState({
        height: "",
        length: "",
        width: "",
        mass: "",
    });
    const [urlState, setUrlState] = useState<null | string>(null)
    const [openModal, setIsOpenModal] = useState(false)
    const intl = useIntl();
    const ordersOperation = new OrdersOperation();

    const handleEditClick = () => {
        setIsEditing(true);
        const heightInput = document.getElementById("heightInput");
        if (heightInput) {
            heightInput.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleSaveClick = async () => {
        const tempErrors = { ...errors };
        let hasError = false;

        if (data.height === "" || data.height === "0") {
            tempErrors.height = intl.formatMessage({ id: 'Mission.Detail.Error1' });
            hasError = true;
        }
        if (data.length === "" || data.length === "0") {
            tempErrors.length = intl.formatMessage({ id: 'Mission.Detail.Error2' });
            hasError = true;
        }
        if (data.width === "" || data.width === "0") {
            tempErrors.width = intl.formatMessage({ id: 'Mission.Detail.Error3' });
            hasError = true;
        }
        if (data.mass === "" || data.mass === "0") {
            tempErrors.mass = intl.formatMessage({ id: 'Mission.Detail.Error4' });
            hasError = true;
        }

        if (hasError) {
            setErrors(tempErrors);
            return;
        } else {
            setErrors({
                height: "",
                length: "",
                width: "",
                mass: "",
            });

            const confirmed = window.confirm(intl.formatMessage({ id: 'Mission.Detail.Alert2' }));
            if (confirmed) {
                let updatingOrderInfo: UpdatingOrderInfo = {
                    mass: parseFloat(data.mass),
                    height: parseFloat(data.height),
                    width: parseFloat(data.width),
                    length: parseFloat(data.length),
                    COD: parseFloat(data.COD),
                    status_code: parseFloat(data.status_code)
                };

                let updatingOrderCondition: UpdatingOrderCondition = {
                    order_id: data.order_id,
                };
                const response = await ordersOperation.update(updatingOrderInfo, updatingOrderCondition);

                if (response.error) {
                    alert(intl.formatMessage({ id: 'Mission.Detail.Alert3' }));
                } else {
                    reloadData();
                }
                setIsEditing(false);
            }
        }
    };

    const CustomDot = ({ onMove, index, onClick, active }: any) => {
        return (
            <div className="h-full pb-[12px] flex justify-between">
                <div
                    className="text-gray-600"
                    onClick={() => onClick()}
                >
                    {active ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                </div>
            </div>
        );
    };

    const CustomButtonGroup = ({ next, previous }: any) => {
        return (
            <div className="w-full h-10 mt-2 flex justify-between">
                <Button className="left" type="button" onClick={() => previous()}>
                    <FiChevronLeft className="h-full w-8 text-gray-500" />
                </Button>
                <Button className="right" type="button" onClick={() => next()}>
                    <FiChevronRight className="h-full w-8 text-gray-500" />
                </Button>
            </div>
        );
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const condition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "send"
                };
                const urls = await ordersOperation.getImage(condition);
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        const fetchImages2 = async () => {
            try {
                const condition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "receive"
                };
                const urls2 = await ordersOperation.getImage(condition);
                setImageUrls2(urls2);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
        fetchImages2();
    }, []);

    useEffect(() => {
        if (data.height !== "" && data.height !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, height: "" }));
        }
        if (data.length !== "" && data.length !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, length: "" }));
        }
        if (data.width !== "" && data.width !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, width: "" }));
        }
        if (data.mass !== "" && data.mass !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, mass: "" }));
        }
    }, [data]);

    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setData({ ...data, [name]: value });
        }
    };

    const handleOpenImgClick = (url) => {
        setUrlState(url);
        setIsOpenModal(true);
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
            {openModal && <ImageView url={urlState} onClose={() => setIsOpenModal(false)} />}
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
                        <FormattedMessage id="Mission.Detail.Title" />
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full pb-1 sm:pb-0 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="grow mt-4 relative flex flex-col md:flex-row bg-gray-200 bg-clip-border w-full overflow-y-scroll p-4 px-2 rounded-sm no-scrollbar">
                    <div className="flex flex-col w-full md:w-1/2 px-2 md:pr-4 mb-4">
                        <div className="flex flex-col gap-1 place-items-center w-full justify-center ">
                            <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300" onClick={() => setOption(0)}>
                                {option === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                                <span className="pl-1 font-bold text-base"><FormattedMessage id="Mission.AddImage.Button1" /></span>
                            </Button>
                            <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300" onClick={() => setOption(1)}>
                                {option === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                                <span className="pl-1 font-bold text-base"><FormattedMessage id="Mission.AddImage.Button2" /></span>
                            </Button>
                        </div>
                        {imageUrls && option === 0 && <div className="relative">
                            <Carousel
                                additionalTransfrom={0} draggable keyBoardControl
                                autoPlay showDots={true}
                                autoPlaySpeed={3000}
                                shouldResetAutoplay={true}
                                swipeable minimumTouchDrag={80} pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={true}
                                renderDotsOutside={true}
                                customDot={<CustomDot />}
                                customButtonGroup={<CustomButtonGroup />}
                                responsive={{
                                    res1: { breakpoint: { max: 40000, min: 0 }, items: 1, partialVisibilityGutter: 0 },
                                }}
                                containerClass="w-full h-40 md:h-52 lg:h-96 rounded-2xl mt-2 outline outline-[1px] outline-gray-300 bg-white"
                                rewind={true}
                                rewindWithAnimation={true}
                                arrows={false}
                                transitionDuration={1000}
                                dotListClass="flex justify-between gap-1"
                            >
                                {imageUrls.length !== 0 ? (
                                    imageUrls.map((url, index) => (
                                        <div key={index} className='rounded-t-xl px-2'>
                                            <Image
                                                onClick={() => handleOpenImgClick(url)}
                                                src={url}
                                                alt={`Order Image ${index}`}
                                                width={100}
                                                height={100}
                                                className='w-full h-40 lg:h-96 rounded-md object-contain'
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center text-center">
                                        <p>No image uploaded</p>
                                    </div>
                                )}
                            </Carousel>
                        </div>
                        }
                        {imageUrls2 && option === 1 && <div className="relative"><Carousel
                            additionalTransfrom={0} draggable keyBoardControl
                            autoPlay showDots={true}
                            autoPlaySpeed={3000}
                            shouldResetAutoplay={true}
                            swipeable minimumTouchDrag={80} pauseOnHover
                            renderArrowsWhenDisabled={false}
                            renderButtonGroupOutside={true}
                            renderDotsOutside={true}
                            customDot={<CustomDot />}
                            customButtonGroup={<CustomButtonGroup />}
                            responsive={{
                                res1: { breakpoint: { max: 40000, min: 0 }, items: 1, partialVisibilityGutter: 0 },
                            }}
                            containerClass="w-full h-40 md:h-52 lg:h-96 rounded-2xl mt-2 outline outline-[1px] outline-gray-300 bg-white"
                            rewind={true}
                            rewindWithAnimation={true}
                            arrows={false}
                            transitionDuration={1000}
                            dotListClass="flex justify-between gap-1"
                        >
                            {imageUrls2.length !== 0 ? (imageUrls2.map((url, index) => (
                                <div key={index} className='w-full h-40 lg:h-96 rounded-md object-contain'>
                                    <Image
                                        onClick={() => handleOpenImgClick(url)}
                                        src={url}
                                        alt={`Order Image ${index}`}
                                        width={100}
                                        height={100}
                                        className='h-full w-full rounded-md object-contain'
                                    />
                                </div>
                            ))) : (<div className="flex justify-center text-center">
                                <p>No image uploaded</p>
                            </div>)
                            }
                        </Carousel></div>
                        }
                    </div>
                    <div className="flex flex-col gap-5 w-full min-h-[660px] h-full bg-white overflow-x-scroll p-4 rounded-xl md:mr-2">
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info1" />:</div>
                            <div className="w-1/2 pl-2">{data.order_id}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info9" />:</div>
                            <div className="w-1/2 pl-2">{data.name_sender}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                            <div className="w-1/2 pl-2">{`${data.detail_source}, ${data.ward_source}, ${data.district_source}, ${data.province_source}`}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info10" />:</div>
                            <div className="w-1/2 pl-2">{data.phone_number_sender}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info11" />:</div>
                            <div className="w-1/2 pl-2">{data.name_receiver}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                            <div className="w-1/2 pl-2">{`${data.detail_dest}, ${data.ward_dest}, ${data.district_dest}, ${data.province_dest}`}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info12" />:</div>
                            <div className="w-1/2 pl-2">{data.phone_number_receiver}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info13" />:</div>
                            <div className="w-1/2 pl-2">{parseFloat(data.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info4" />:</div>
                            <div className="w-1/2 pl-2">{parseFloat(data.COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info5" />:</div>
                            {isEditing ? (
                                <div className="relative w-1/2">
                                    <input
                                        className={`w-full dark:text-[#000000] pl-2 rounded ${errors.mass ? "border-2 border-red-500" : "border-2 border-blue-500"}`}
                                        type="text"
                                        name="mass"
                                        value={data.mass}
                                        onChange={handleNumericInputChange}
                                    />
                                    {errors.mass && (
                                        <span className="absolute text-red-500 text-sm -bottom-[1.35rem] left-0">{errors.mass}</span>
                                    )}
                                </div>
                            ) : (
                                <div className="w-1/2 pl-2">{data.mass}</div>
                            )}
                        </div>
                        <div className={`flex ${errors.mass ? "mt-1.5" : ""}`}>
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info6" />:</div>
                            {isEditing ? (
                                <div className="relative w-1/2">
                                    <input
                                        className={`w-full dark:text-[#000000] pl-2 rounded ${errors.length ? "border-2 border-red-500" : "border-2 border-blue-500"}`}
                                        type="text"
                                        name="length"
                                        value={data.length}
                                        onChange={handleNumericInputChange}
                                    />
                                    {errors.length && (
                                        <span className="absolute text-red-500 text-sm -bottom-[1.35rem] left-0">{errors.length}</span>
                                    )}
                                </div>
                            ) : (
                                <div className="w-1/2 pl-2">{data.length}</div>
                            )}
                        </div>
                        <div className={`flex ${errors.length ? "mt-1.5" : ""}`}>
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info7" />:</div>
                            {isEditing ? (
                                <div className="relative w-1/2">
                                    <input
                                        className={`w-full dark:text-[#000000] pl-2 rounded ${errors.width ? "border-2 border-red-500" : "border-2 border-blue-500"}`}
                                        type="text"
                                        name="width"
                                        value={data.width}
                                        onChange={handleNumericInputChange}
                                    />
                                    {errors.width && (
                                        <span className="absolute text-red-500 text-sm -bottom-[1.35rem] left-0">{errors.width}</span>
                                    )}
                                </div>
                            ) : (
                                <div className="w-1/2 pl-2">{data.width}</div>
                            )}
                        </div>
                        <div className={`flex ${errors.width ? "mt-1.5" : ""}`} id="heightInput">
                            <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info8" />:</div>
                            {isEditing ? (
                                <div className="relative w-1/2">
                                    <input
                                        className={`w-full dark:text-[#000000] pl-2 rounded ${errors.height ? "border-2 border-red-500" : "border-2 border-blue-500"}`}
                                        type="text"
                                        name="height"
                                        value={data.height}
                                        onChange={handleNumericInputChange}
                                    />
                                    {errors.height && (
                                        <span className="absolute text-red-500 text-sm bottom-1 left-0">{errors.height}</span>
                                    )}
                                </div>
                            ) : (
                                <div className="w-1/2 pl-2 pb-6">{data.height}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full flex h-16 sm:h-[72px]">
                    {!isEditing ? (
                        <Button
                            className="w-full rounded-lg mt-5 mb-1 py-3 text-[#545e7b] border-[#545e7b] hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex gap-2"
                            onClick={handleEditClick}
                        >
                            <FaPen />
                            <span><FormattedMessage id="Mission.Detail.Button1" /></span>
                        </Button>
                    ) : (
                        <Button
                            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-400 hover:border-green-600 text-green-500 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex gap-2"
                            onClick={handleSaveClick}
                        >
                            <FaPen />
                            <span className="xs:block"><FormattedMessage id="Mission.Detail.Button2" /></span>
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div >
    );
};

export default DetailPopup;
