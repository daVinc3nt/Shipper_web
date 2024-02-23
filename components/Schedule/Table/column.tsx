import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell'
import { Task } from '@/components/types'
import { ArrowUpDown} from "lucide-react";
import { EditCell } from './EditCell'
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@nextui-org/react";
const columnHelper = createColumnHelper<Task>()

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskId",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",

    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => {column.toggleSorting(column.getIsSorted() === "asc"); console.log("hello")}}
        >
          Priority
          <ArrowUpDown className="ml-2 w-4" />
        </Button>
      );
    },
    meta: {
      type: 'number',
    },
    cell: TableCell
  },
  {
    accessorKey: "deadline",
    meta: {
      type: "date",
      required: true,
      validate: (value: string) => {
        const date = new Date(value);
        const today = new Date();
        return date <= today;
      },
      validationMessage: 'Date cannot be in the future',
    },
    header: ({ column }) => {
      return (
        <Button
          className="rounded"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]
