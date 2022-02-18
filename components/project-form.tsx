import React, { FormEventHandler } from "react";
import { UilCheck, UilTimes, UilTrashAlt } from "@iconscout/react-unicons";

import Button from "./button";
import { Project } from "../types/toggl";
import { useTogglStore } from "../store";

interface ProjectFormProps {
  project: Project;
  isLoading: boolean;
  handleClose: () => void;
  handleDelete: (pid: number) => void;
  handleSubmit: FormEventHandler;
  onChange: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  isLoading,
  handleClose,
  handleDelete,
  handleSubmit,
  onChange,
}) => {
  const { clients } = useTogglStore((state) => ({ clients: state.clients }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 modal-body">
        <fieldset>
          <label
            htmlFor="project-name"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Name&nbsp;<span className="text-red-600">*</span>
          </label>
          <input
            autoFocus
            type="text"
            name="name"
            id="project-name"
            placeholder="Your Next Productive Distraction"
            className="w-full focus:ring-emerald-400 focus:border-emerald-400"
            value={project.name}
            onChange={(e) => onChange({ ...project, name: e.target.value })}
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
            value={project.cid && project.cid > 0 ? project.cid.toString() : -1}
            onChange={(e) =>
              onChange({ ...project, cid: parseInt(e.target.value, 10) })
            }
          >
            <option value="-1">None</option>
            {clients.map((client) => (
              <option value={client.id!} key={client.id!}>
                {client.name}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      <footer className="modal-footer">
        {project.id && project.id !== -1 ? (
          <button
            className="flex items-center secondary"
            onClick={() => handleDelete(project.id!)}
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
          type="submit"
          isLoading={isLoading}
        >
          <div className="flex items-center w-full space-x-2">
            <UilCheck />
            <span>
              {project.id && project.id === -1 ? "Add Project" : "Edit Project"}
            </span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

export default ProjectForm;
