import React, { FormEventHandler } from "react";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";

import Button from "./button";
import { Client } from "../types/toggl";

interface ClientFormProps {
  client: Client;
  isLoading: boolean;
  handleClose: () => void;
  handleSubmit: FormEventHandler;
  onChange: (client: Client) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  isLoading,
  handleClose,
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
            Name
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
            <span>Add Client</span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

export default ClientForm;
