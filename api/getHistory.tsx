import { ShippersOperation } from "@/TDLib/tdlogistics";
import { columns } from "../components/History/Table/column";
import { DataTable } from "../components/History/Table/datatable";
async function getData(option: number) {
  const histories = new ShippersOperation();
  const data = await histories.getHistory({ option: option });
  return data;
}

export default async function DemoPage() {
  const data = await getData(0);
  console.log(data)

  return <DataTable columns={columns} data={data} />;
}
