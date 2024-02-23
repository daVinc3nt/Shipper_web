import useSWR, { mutate } from 'swr';
import { Task } from './types';

const url = 'https://65cfd4b8bdb50d5e5f5bdf8e.mockapi.io/task';

async function updateRequest(id: number, data: Task) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Task) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(id: number) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

export async function getRequest() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default function useData() {
  const { data, isValidating } = useSWR(url, getRequest);

  const updateRow = async (id: number, postData: Task) => {
    await updateRequest(id, postData);
    mutate(url);
  };

  const deleteRow = async (id: number) => {
    await deleteRequest(id);
    mutate(url);
  };

  const addRow = async (postData: Task) => {
    await addRequest(postData);
    mutate(url);
  };

  return {
    data: data ?? [],
    isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
