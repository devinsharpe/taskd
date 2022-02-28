import { UilTimes } from "@iconscout/react-unicons";
import React from "react";
import { useTogglStore } from "../store";
import ClientItem from "./client-item";

interface ClientListProps {
  handleEdit: (cid: number) => void;
  handleDelete: (cid: number) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  handleDelete,
  handleEdit,
}) => {
  const { clients } = useTogglStore((state) => ({ clients: state.clients }));
  return (
    <ul className="w-full space-y-2 overflow-y-auto">
      {clients.map((client) => (
        <ClientItem
          client={client}
          key={client.id!}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </ul>
  );
};

export default ClientList;
