import { ShippersOperation } from "@/TDLib/tdlogistics";

interface GettingTasksCondition {
    option: number,
}
const tasks = new ShippersOperation();

export default async function fetchTask(option: number) {
    const data = await tasks.getTask({ option: option });
    console.log(data.data)
    return data.data
}