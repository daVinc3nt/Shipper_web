"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailNoti from "../Detail/detailNoti";
import { Checkbox } from "@/components/TableUI/checkbox"
import {FormattedMessage, useIntl} from "react-intl"
import Consignment from "@/pages/dashboard/consignment";
export interface Order {
  orderId: string;
  mass: number;
  length: number;
  width: number;
  height: number;
  pickupLocation: string;
  deliveryLocation: string;
  fee: number;
  cod: number;
  status: number;
}

export type Consignment = {
  consignmentCode: string;
  barcode: string;
  deliveryManName: string;
  licensePlate: string;
  container: string;
  consState: number;
  consCode: string;
  orders: Order[];
  carrierName: string;
  mass: number;
  id: number;
};
export const columns: ColumnDef<Consignment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row1"/>
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({ row }) => {
      const index = row.index + 1;
      return (
        <>{index}</>
      );
    },
  },
  {
    accessorKey: "consignmentCode",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row2"/>
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "deliveryManName",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row3"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "carrierName",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row4"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mass",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row5"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "consState",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="Consignment.Row6"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const consState = row.original.consState;
      let statusLabel = "";
      let statusColor = "";
      const intl = useIntl(); 

      switch (consState) {
        case 1:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Ongoing' });
          statusColor = "text-yellow-600";
          break;
        case 2:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Pending' });
          statusColor = "text-gray-500";
          break;
        case 3:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Done' });
          statusColor = "text-green-500";
          break;
        case 4:
          statusLabel = intl.formatMessage({ id: 'Consignment.Status.Cancel' });
          statusColor = "text-red-500";
          break;
        default:
          statusLabel = "Unknown";
      }

      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  },
  {
    accessorKey: "Chi tiết",
    header: () => {
      return (
        <div className="text-right whitespace-nowrap"><FormattedMessage id="Consignment.Row7"/></div>
      );
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
          {modalIsOpen && <DetailNoti onClose={closeModal} dataInitial={row.original}/>}
        </div>
      );
    },
  },
];
