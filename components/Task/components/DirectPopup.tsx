import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { FormattedMessage } from "react-intl";


interface DirectPopupProps {
    onClose: () => void;
    dataInitial: any;
    toggle: () => void;
}

const DirectPopup: React.FC<DirectPopupProps> = ({ onClose, dataInitial, toggle }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [option, setOption] = useState("source");
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);

    const handleSubmitClick = () => {
        toggle();
        if (option == "source") {
            myLocation()
            setDestination({
                lat: dataInitial.lat_source,
                lng: dataInitial.long_source,
                label: `${dataInitial.detail_source}, ${dataInitial.ward_source}, ${dataInitial.district_source}, ${dataInitial.province_source}`,
                name: `${dataInitial.detail_source}, ${dataInitial.ward_source}, ${dataInitial.district_source}, ${dataInitial.province_source}`
            })
        } else if (option == "destination") {
            myLocation()
            setDestination({
                lat: dataInitial.lat_destination,
                lng: dataInitial.long_destination,
                label: `${dataInitial.detail_dest}, ${dataInitial.ward_dest}, ${dataInitial.district_dest}, ${dataInitial.province_dest}`,
                name: `${dataInitial.detail_dest}, ${dataInitial.ward_dest}, ${dataInitial.district_dest}, ${dataInitial.province_dest}`
            })
        }
        onClose();
    };


    const myLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setSource({
                        lat: latitude,
                        lng: longitude,
                        label: "Vị trí của bạn",
                        name: "Vị trí của bạn"
                    })
                },
                (error) => {
                    console.error("Error getting current position:", error);
                }
            );
        }
    };

    const handleDirect = (type: string) => {
        setOption(type)
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
                        <FormattedMessage id="Mission.Direct.Title" />
                    </div>
                    <Button
                        className="absolute right-0 w-8 h-8 top-0 rounded-full mb-2 hover:bg-gray-200"
                        onClick={() => onClose()}
                    >
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="mt-4 relative flex flex-col bg-gray-200 bg-clip-border w-full px-10 py-2 rounded-sm gap-1">
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2" onClick={() => handleDirect("source")}>
                        <span className="pr-1"><FormattedMessage id="Mission.Direct.Option1" /></span>
                        {option === "source" ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2" onClick={() => handleDirect("destination")}>
                        <span className="pr-1"><FormattedMessage id="Mission.Direct.Option2" /></span>
                        {option === "destination" ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                </div>

                <div className="w-full flex h-16 sm:h-[72px]">
                    <Button
                        className="w-full rounded-lg mt-4 sm:mt-5 mb-1 py-3 text-[#545e7b] border-[#545e7b] hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                        onClick={handleSubmitClick}
                    >
                        <span><FormattedMessage id="Mission.Direct.Button" /></span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DirectPopup;