"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";
import OrderList from "./DetailMore/export";
import { LogoIcon, UsersIcon } from "@/components/Icons";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn
export type Staff = {
  id: number;
  name: string;
  status: boolean;
};

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Staff Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="flex flex-col">
            {row.original.status ? "Đang làm việc" : "Đã nghỉ việc"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Detail",
    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };
      const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);

      useEffect(() => {
        const fetchDemoPage = async () => {
          const result = await OrderList();
          setDemoPage(result);
        };

        fetchDemoPage();
      }, []);
      return (
        <div className="relative rounded-lg ">
          <Button
            onClick={openModal}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Xem chi tiết
          </Button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Thông tin chi tiết nhân viên"
          >
            <div>
              <LogoIcon className=" w-12 h-12" />
              <div className="absolute top-0 right-0">
                <button
                  className="bg-red-500 text-white w-12 h-8"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>

              <div>
                <p className=" font-bold text-lg">
                  Thông tin chi tiết nhân viên :
                </p>
                {demoPage}
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];
