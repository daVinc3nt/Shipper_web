"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import React from "react";
import { Checkbox } from "@/components/TableUI/checkbox"
import {FormattedMessage, useIntl } from "react-intl"
export type Order = {
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
export const columns: ColumnDef<Order>[] = [
//select
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
//number
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           <FormattedMessage id="order.ord"/>
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
//orderid
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.Id"/>
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
//pickuplocation
  {
    accessorKey: "pickupLocation",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.pickuplocation"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
//deliveryLocation
{
  accessorKey: "deliveryLocation",

  header: ({ column }) => {
    return (
      <Button
        className="rounded"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <FormattedMessage id="order.receive"/>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
},
//mass
  {
    accessorKey: "mass",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.mass"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
// status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <FormattedMessage id="order.status"/>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const intl =useIntl();
      const consState = row.original.status;
      let statusLabel = "";
      let statusColor = "";

      switch (consState) {
        case 1:
          statusLabel = intl.formatMessage({ id: 'order.status.ongoing' });
          statusColor = "text-yellow-600";
          break;
        case 2:
          statusLabel = intl.formatMessage({ id: 'order.status.pending' });
          statusColor = "text-gray-500";
          break;
        case 3:
          statusLabel = intl.formatMessage({ id: 'order.status.done' });
          statusColor = "text-green-500";
          break;
        case 4:
          statusLabel = intl.formatMessage({ id: 'order.status.cancel' });
          statusColor = "text-red-500";
          break;
        default:
          statusLabel = "Unknown";
      }

      return (
        <span className={statusColor}>{statusLabel}</span>
      );
    },
  }
];
