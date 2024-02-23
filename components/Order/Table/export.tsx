import { useState } from "react";
import { Order, columns } from "./column";
import { DataTable } from "./datatable";

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.

  const res = await fetch(
    "https://65b8fe3fb71048505a89e8db.mockapi.io/api/consignment"
  );
  const data = await res.json();
  const orders: Order[] = data.flatMap((consignment) => consignment.orders);
  return orders;
}

export default async function DemoPage() {
  const data = await getData()
  let done = 0,pending = 0,cancel = 0;
  data.map((data)=>{
    if (data.status === 3) 
      done++;
    else if(data.status === 4)
      cancel++;
    else pending++;
  })
  return (
      <DataTable cancel={cancel} done={done} pending={pending} columns={columns} data={data} />
  );
}
