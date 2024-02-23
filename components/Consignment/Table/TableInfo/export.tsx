import { useState } from "react";
import { Consignment, columns } from "./column";
import { DataTable } from "./datatable";

async function getData(): Promise<Consignment[]> {
  // Fetch data from your API here.

  const res = await fetch(
    "https://65b8fe3fb71048505a89e8db.mockapi.io/api/consignment"
  );
  const data = await res.json();
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
      <DataTable columns={columns} data={data} />
  );
}
