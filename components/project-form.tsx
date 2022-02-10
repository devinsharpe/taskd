import { UilCheck, UilTimes } from "@iconscout/react-unicons";

import Button from "./button";
import React from "react";
import { useTogglStore } from "../store";

interface ProjectFormProps {
  handleClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ handleClose }) => {
  const { clients } = useTogglStore((state) => ({ clients: state.clients }));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4 modal-body">
        <fieldset>
          <label
            htmlFor="project-name"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Name
          </label>
          <input
            autoFocus
            type="text"
            name="name"
            id="project-name"
            placeholder="Your Next Productive Distraction"
            className="w-full focus:ring-emerald-400 focus:border-emerald-400"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="project-client"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Client
          </label>
          <select
            name="client"
            id="project-client"
            className="w-full focus:ring-emerald-400 focus:border-emerald-400"
            defaultValue="NONE"
          >
            <option value="NONE">None</option>
            {clients.map((client) => (
              <option value={client.id!} key={client.id!}>
                {client.name}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      <footer className="modal-footer">
        <button
          className="flex items-center space-x-2 secondary"
          onClick={handleClose}
        >
          <UilTimes />
          <span className="hidden md:inline">Close</span>
        </button>
        <Button scaleOnHover variant="primary" className="w-full">
          <div className="flex items-center w-full space-x-2">
            <UilCheck />
            <span>Add Project</span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

export default ProjectForm;
