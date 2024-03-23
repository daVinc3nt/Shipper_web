import { ShippersOperation } from "@/TDLib/tdlogistics";
import { columns } from "../components/History/Table/column";
import { DataTable } from "../components/History/Table/datatable";
async function getData(option: number) {
  const histories = new ShippersOperation();
  const data = await histories.getHistory({ option: option });
  return data;
}

export default async function DemoPage(reloadData, option) {
  const data = await getData(option);

  return <DataTable columns={columns} data={data.data} reloadData={reloadData} />;
}
