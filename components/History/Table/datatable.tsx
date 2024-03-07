"use client";
import React, { useEffect, useState } from "react";
import { TbMinusVertical } from "react-icons/tb";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/TableUI/table";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import BasicPopover from "@/components/Common/Popover";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reloadData: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  reloadData
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedOption, setSelectedOption] = useState(0);
  const intl = useIntl()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  useEffect(() => {
    reloadData();
  }, [selectedOption]);

  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  const handleDeleteRowsSelected = () => {
    table.getFilteredSelectedRowModel().rows.forEach((row) => {
      console.log(row.original);
      // Chỗ này call API về sever để xóa nhân viên nè m
      //chỉ cần truyền row.original.id vào là được
    });
  };
  const confirmDelete = () => {
    return window.confirm("Are you sure you want to delete?");
  };
  const deleteRows = () => {
    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      // Gọi hàm handleDeleteRowsSelected để xóa các hàng đã chọn
      handleDeleteRowsSelected();
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="relative w-full flex justify-between">
            <Dropdown className="z-30">
              <DropdownTrigger>
                <Button
                  className="text-xxs md:text-base border border-gray-600 rounded px-4 text-center h-10"
                  aria-label="Show items per page"
                >
                  <span className="text-sm">
                    <FormattedMessage id="Show" />{" "}
                    {table.getState().pagination.pageSize}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-white border border-gray-300 rounded"
                aria-labelledby="dropdownMenuButton"
              >
                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                  <DropdownItem
                    key={pageSize}
                    textValue={`Show ${pageSize} items per page`}
                  >
                    <Button
                      onClick={() => table.setPageSize(pageSize)}
                      variant="bordered"
                      aria-label={`Show ${pageSize}`}
                      className="text-center text-black w-full"
                    >
                      <FormattedMessage id="Show" /> {pageSize}
                    </Button>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className={`z-30`}>
              <DropdownTrigger>
                <Button className="text-xs md:text-base border h-10 border-gray-600 rounded px-4 text-center" >
                  <span className="bg-white rounded-full font-normal">{intl.formatMessage({ id: `Mission.Filter${selectedOption + 1}` })}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-white border border-gray-300 no-scrollbar rounded-md w-full max-h-80 overflow-y-auto"
                aria-labelledby="dropdownMenuButton2"
                key="dropdownMenuButton2"
              >
                <DropdownItem key="filter_all" textValue="filter_all">
                  <Button
                    aria-label="dropdownItem1"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 0 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(0)}
                  >
                    <FormattedMessage id="Mission.Filter1" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_today" textValue="filter_today">
                  <Button
                    aria-label="dropdownItem2"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 1 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(1)}
                  >
                    <FormattedMessage id="Mission.Filter2" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_this_week" textValue="filter_this_week">
                  <Button
                    aria-label="dropdownItem3"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 2 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(2)}
                  >
                    <FormattedMessage id="Mission.Filter3" />
                  </Button>
                </DropdownItem>
                <DropdownItem key="filter_this_month" textValue="filter_this_month">
                  <Button
                    aria-label="dropdownItem3"
                    className={`text-center text-black w-full rounded-md px-2 ${selectedOption === 3 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedOption(3)}
                  >
                    <FormattedMessage id="Mission.Filter4" />
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-gray-700 ${row.getIsSelected() ? "bg-gray-700" : ""
                    }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-20 hover:text-white border border-black hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal hover:border-white
          text-black rounded-md text-sm text-center me-2"
        >
          <span>
            <FormattedMessage id="Prev" />
          </span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
            <FormattedMessage id="Page" />
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}{" "}
            <FormattedMessage id="of" /> {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          <FormattedMessage id="Go to page" />:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-20 hover:text-white border border-black hover:bg-black
          hover:shadow-md md:text-base focus:outline-none font-normal hover:border-white
          text-black rounded-md text-sm text-center me-2"
        >
          <span>
            <FormattedMessage id="Next" />
          </span>
        </Button>
      </div>
    </div>
  );
}
