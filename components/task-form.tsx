import React from "react";
import { useTogglStore } from "../store";

const TaskForm = () => {
  const { projects, tags } = useTogglStore((state) => ({
    projects: state.projects,
    tags: state.tags,
  }));

  return (
    <form
      className="items-start w-full space-y-4 md:flex md:space-x-4 md:space-y-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <section className="w-full space-y-4 md:w-1/2">
        <fieldset className="w-full">
          <label
            htmlFor="task-title"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Title
          </label>
          <input
            name="title"
            id="task-title"
            className="w-full px-3 py-2 border rounded focus:outline-blue-400 dark:bg-white border-zinc-600"
          />
        </fieldset>
        <fieldset className="w-full">
          <label
            htmlFor="task-project"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Project
          </label>
          <select
            name="pid"
            id="task-project"
            className="w-full px-3 py-2 border rounded focus:outline-blue-400 dark:bg-white border-zinc-600"
          >
            <option value="-1">None</option>
            {projects.map((project) => (
              <option value={project.id!} key={project.id!}>
                {project.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="w-full">
          <label
            htmlFor="task-notes"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Notes
          </label>
          <textarea
            name="notes"
            id="task-notes"
            className="w-full px-3 py-2 border rounded focus:outline-blue-400 dark:bg-white border-zinc-600"
          />
        </fieldset>
        <fieldset className="w-full">
          <label
            htmlFor="task-due-date"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          ></label>
          <input
            name="dueDate"
            id="task-due-date"
            type="date"
            className="w-full px-3 py-2 border rounded focus:outline-blue-400 dark:bg-white border-zinc-600"
          />
        </fieldset>
      </section>
      <section className="w-full p-2 space-y-2 overflow-y-auto rounded-lg bg-zinc-200 md:w-1/2 max-h-48 md:max-h-96 dark:bg-white/10">
        {tags.map((tag) => (
          <fieldset
            className="flex items-center px-2 space-x-2 space-y-0"
            key={tag.id!}
          >
            <input
              type="checkbox"
              name={`tag${tag.id!}`}
              id={`tag-${tag.id!}`}
              className="w-5 h-5 rounded"
            />
            <label
              htmlFor={`tag-${tag.id!}`}
              className="block text-zinc-800 dark:text-white"
            >
              {tag.name}
            </label>
          </fieldset>
        ))}
      </section>
    </form>
  );
};

export default TaskForm;
