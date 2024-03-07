import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import type { History } from "./column";
interface DetailOrderProps {
  onClose: () => void;
  dataInitial: History;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
  const intl = useIntl();
  const data = dataInitial;

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10 z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        className={`relative w-[98%] sm:w-9/12 bg-white rounded-xl p-4`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-gray-200 overflow-hidden">
          <div className="font-bold text-lg sm:text-2xl pb-2 w-full text-center">
            <FormattedMessage id="Mission.Detail.Title" />
          </div>
          <Button
            className="absolute right-0 w-8 h-8 top-0 rounded-full mb-2 hover:bg-gray-200"
            onClick={onClose}
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
              <div className="w-1/2 pl-2">{data.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info4" />:</div>
              <div className="w-1/2 pl-2">{data.COD.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold text-base">
                <FormattedMessage id="Mission.Detail.Info5" />:
              </div>
              <div className="w-1/2 pl-2">{data.mass}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold text-base">
                <FormattedMessage id="Mission.Detail.Info6" />:
              </div>
              <div className="w-1/2 pl-2">{data.length}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold text-base">
                <FormattedMessage id="Mission.Detail.Info7" />:
              </div>
              <div className="w-1/2 pl-2">{data.width}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold text-base">
                <FormattedMessage id="Mission.Detail.Info8" />:
              </div>
              <div className="w-1/2 pl-2">{data.height}</div>
            </div>
            <div className="w-full p-1">

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailOrder;
