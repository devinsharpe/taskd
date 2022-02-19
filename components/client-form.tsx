import React, { FormEventHandler } from "react";
import {
  UilCheck,
  UilListUl,
  UilTimes,
  UilTrashAlt,
} from "@iconscout/react-unicons";

import Button from "./button";
import { Client } from "../types/toggl";

interface ClientFormProps {
  client: Client;
  isLoading: boolean;
  handleClose: () => void;
  handleDelete: (cid: number) => void;
  handleList: () => void;
  handleSubmit: FormEventHandler;
  onChange: (client: Client) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  isLoading,
  handleClose,
  handleDelete,
  handleList,
  handleSubmit,
  onChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 modal-body">
        <fieldset>
          <label
            htmlFor="client-name"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Name&nbsp;<span className="text-red-600">*</span>
          </label>
          <input
            autoFocus
            required
            placeholder="Local Business"
            name="name"
            id="client-name"
            type="text"
            className="w-full focus:ring-amber-400 focus:border-amber-400 "
            value={client.name}
            onChange={(e) => onChange({ ...client, name: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="client-notes"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Notes
          </label>
          <textarea
            name="notes"
            id="client-notes"
            className="w-full focus:ring-amber-400 focus:border-amber-400 "
            value={client.notes ? client.notes : ""}
            onChange={(e) => onChange({ ...client, notes: e.target.value })}
          ></textarea>
        </fieldset>
      </div>
      <footer className="modal-footer">
        {client.id && client.id !== -1 ? (
          <button
            className="flex items-center secondary"
            onClick={() => handleDelete(client.id!)}
            type="button"
          >
            <UilTrashAlt />
          </button>
        ) : (
          <></>
        )}
        <button
          className="flex items-center space-x-2 secondary"
          onClick={handleClose}
          type="button"
        >
          <UilTimes />
          <span className="hidden md:inline">Close</span>
        </button>
        <Button
          scaleOnHover
          variant="primary"
          className="w-full"
          isLoading={isLoading}
          type="submit"
        >
          <div className="flex items-center w-full space-x-2">
            <UilCheck />
            <span>
              {client.id && client.id === -1 ? "Add " : "Edit "}
              <span className="hidden md:inline-block">Client</span>
            </span>
          </div>
        </Button>
        {client.id === -1 && (
          <button
            className="flex items-center space-x-2 secondary"
            onClick={handleList}
            type="button"
          >
            <UilListUl />
          </button>
        )}
      </footer>
    </form>
  );
};

export default ClientForm;
