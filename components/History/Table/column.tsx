"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailOrder from "./detailOrder";
import { FormattedMessage } from "react-intl";
export type History = {
  COD: number;
  agency_id: string;
  completed: number;
  completed_at: string;
  container: string;
  created_at: string;
  detail_dest: string;
  detail_source: string;
  district_dest: string;
  district_source: string;
  fee: number;
  height: number;
  id: number;
  journey: any[];
  lat_destination: number;
  lat_source: number;
  length: number;
  long_destination: number;
  long_source: number;
  mass: number;
  miss: number;
  name_receiver: string;
  name_sender: string;
  order_id: string;
  order_time: string;
  parent: string;
  phone_number_receiver: string;
  phone_number_sender: string;
  province_dest: string;
  province_source: string;
  service_type: number;
  shipper: string;
  status_code: number;
  user_id: string;
  ward_dest: string;
  ward_source: string;
  width: number;
};

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Mission.Detail.Info1" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name_sender",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Mission.Detail.Info9" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name_receiver",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Mission.Detail.Info11" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Mission.Detail.Info13" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "COD",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Mission.Detail.Info4" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Chi tiết",
    header: () => {
      return <div className="text-right"><FormattedMessage id="Mission.Detail" /></div>;
    },
    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      return (
        <div className="relative flex justify-end mr-2">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
          >
            +
          </Button>
          {modalIsOpen && (
            <DetailOrder onClose={closeModal} dataInitial={row.original} />
          )}
        </div>
      );
    },
  },
];
