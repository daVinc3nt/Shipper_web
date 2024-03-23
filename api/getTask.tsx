import { ShippersOperation } from "@/TDLib/tdlogistics";
const tasks = new ShippersOperation();

export default async function fetchTask(option: number) {
    const data = await tasks.getTask({ option: option });
    return data.data
}