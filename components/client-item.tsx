import { Client } from "../types/toggl";
import React from "react";
import { UilTrashAlt } from "@iconscout/react-unicons";

interface ClientItemProps {
  client: Client;
  handleDelete: (cid: number) => void;
  handleEdit: (cid: number) => void;
}

const ClientItem: React.FC<ClientItemProps> = ({
  client,
  handleDelete,
  handleEdit,
}) => {
  return (
    <li className="flex items-center justify-between w-full px-4 py-2 space-x-2 border rounded-lg dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700">
      <span
        className="text-lg font-semibold cursor-pointer text-zinc-800 dark:text-white hover:underline"
        onClick={() => handleEdit(client.id!)}
      >
        {client.name}
      </span>
      <button
        className="flex items-center justify-center p-2 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
        onClick={() => handleDelete(client.id!)}
        type="button"
      >
        <UilTrashAlt />
      </button>
    </li>
  );
};

export default ClientItem;
