import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import DetailPopup from "./DetailPopup";
import StatusPopup from "./StatusPopup";
import DirectPopup from "./DirectPopup";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
const MissionCard = ({ data, toggle }) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openDirect, setOpenDirect] = useState(false);
    return (
        <motion.div
            className={`w-full rounded-lg p-4 relative bg-white shadow-md`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
        >
            {openDetail && <DetailPopup onClose={() => setOpenDetail(false)} dataInitial={data} />}
            {openStatus && <StatusPopup onClose={() => setOpenStatus(false)} dataInitial={data} />}
            {openDirect && <DirectPopup onClose={() => setOpenDirect(false)} dataInitial={data} toggle={toggle} />}
            <Dropdown className="z-30">
                <DropdownTrigger key="button">
                    <Button className={`absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 rounded-full text-black`} >
                        <HiDotsHorizontal />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    key="menu"
                    className="bg-white border border-gray-300 no-scrollbar rounded w-full max-h-80 overflow-y-auto"
                    aria-labelledby="dropdownMenuButton"
                >
                    <DropdownItem key="detail">
                        <Button
                            onClick={() => setOpenDetail(true)}
                            aria-label="dropdownItem1"
                            className="text-center text-black w-full"
                        >
                            <FormattedMessage id="Mission.Detail" />
                        </Button>
                    </DropdownItem>
                    <DropdownItem key="status">
                        <Button
                            onClick={() => setOpenStatus(true)}
                            aria-label="dropdownItem1"
                            className="text-center text-black w-full"
                        >
                            <FormattedMessage id="Status" />
                        </Button>
                    </DropdownItem>
                    <DropdownItem key="direct">
                        <Button
                            onClick={() => setOpenDirect(true)}
                            aria-label="dropdownItem1"
                            className="text-center text-black w-full"
                        >
                            <FormattedMessage id="Mission.Direct" />
                        </Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className={`w-full pr-10 flex flex-col text-black`}>
                <span><FormattedMessage id="Mission.OrderCode" />: {data.id}</span>
                <span><FormattedMessage id="Mission.ReceiveLocation" />: {data.address}</span>
                <span><FormattedMessage id="Mission.DeliveryLocation" />: {data.address}</span>
            </div>
        </motion.div>
    );
}

export default MissionCard