import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";
import { FormattedMessage } from "react-intl";
import { Order, columns } from "./Table/column";
import { DataTable } from "./Table/datatable";

async function getData(): Promise<Order[]> {
  
    const res = await fetch(
      "https://65b8fe3fb71048505a89e8db.mockapi.io/api/consignment"
    );
    const data = await res.json();
    const orders: Order[] = data.flatMap((consignment) => consignment.orders);
    return orders;
}

interface AddNotificationProps {
    onClose: () => void;
    addOrders: (orders: Order[]) => void;
}

const AddNotification: React.FC<AddNotificationProps> = ({ onClose, addOrders}) => {
    const [isShaking, setIsShaking] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [data, setData] = useState<Order[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

    const fetchDemoPage = async () => {
        const data = await getData()
        setData(data);
    };
    useEffect(() => {
        fetchDemoPage();
    }, []);

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

    const handleSetSelectedOrders = ( orders: any) => {
        setSelectedOrders(orders)
    };

    const handleSubmit = () => {
        addOrders(selectedOrders);
        handleClose();
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
                backdropFilter: "blur(12px)"
            }}
        >
            <motion.div
                ref={notificationRef}
                className={`relative w-[98%] h-[95%] sm:w-11/12 bg-[#14141a] rounded-xl p-4 overflow-y-auto flex flex-col
          ${isShaking ? 'animate-shake' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
                    <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">Danh sách đơn hàng</div>
                    <Button className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300" onClick={handleClose}>
                        <IoMdClose className="w-5/6 h-5/6" />
                    </Button>
                </div>
                <div className="overflow-y-scroll grow border border-[#545e7b] mt-4 no-scrollbar flex flex-col bg-[#14141a] p-2 rounded-md text-white">
                    {data ? (
                        <DataTable
                            columns={columns}
                            data={data}
                            selectedOrders={selectedOrders} // Truyền danh sách các đơn hàng đã được chọn xuống DataTable
                            setSelectedOrders={handleSetSelectedOrders} // Truyền hàm setSelectedOrders để cập nhật danh sách đơn hàng đã được chọn
                        />
                    ) : (
                        <LoadingSkeleton />
                    )}
                </div>
                <div className="w-full flex justify-center">
                    <Button
                        className={`w-1/2 px-2 rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
                bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
                hover:shadow-md`}
                        onClick={handleSubmit}
                    >
                        <span className="hidden xs:block"><FormattedMessage id="Consignment.Info.Submit" /></span>
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddNotification;
