import React from "react";
import { useTogglStore } from "../store";

const ProjectForm = () => {
  const { clients } = useTogglStore((state) => ({ clients: state.clients }));

  return (
    <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label
          htmlFor="project-name"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Name
        </label>
        <input
          name="name"
          id="project-name"
          className="w-full px-3 py-2 border rounded focus:outline-emerald-400 dark:bg-white border-zinc-600"
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor=""
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Client
        </label>
        <select
          name="client"
          id="project-client"
          className="w-full rounded focus:ring-emerald-400 focus:border-emerald-400"
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
    </form>
  );
};

export default ProjectForm;
