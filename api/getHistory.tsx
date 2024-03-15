import { ShippersOperation } from "@/TDLib/tdlogistics";
import { columns } from "../components/history/Table/column";
import { DataTable } from "../components/history/Table/datatable";
async function getData(option: number) {
  const histories = new ShippersOperation();
  const data = await histories.getHistory({ option: option });
  return data;
}

export default async function DemoPage(reloadData) {
  const data = await getData(0);
  console.log("hello",data)

  return <DataTable columns={columns} data={data.data} reloadData={reloadData} />;
}
