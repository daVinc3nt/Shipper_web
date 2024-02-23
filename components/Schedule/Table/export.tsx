import { useState } from "react";
import { Task } from '@/components/types'
import { columns } from "./column";
import { DataTable } from "./datatable";
import {getRequest}from "@/components/useData";
import useData from "@/components/useData";
async function get() {
  const data = await getRequest();
  // originalData có giá trị ở đây
  return data;
}

export default async function DemoPage() {
  const data = await get()
  return (
    <DataTable columns={columns} originalData={data} />
  );
}
