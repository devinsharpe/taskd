import React from "react";
import { useTogglStore } from "../store";

const TimeEntryForm = () => {
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
            htmlFor="time-entry-project"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Project
          </label>
          <select
            name="project"
            id="time-entry-project"
            className="w-full rounded focus:ring-violet-400 focus:border-violet-400"
          >
            {projects.map((project) => (
              <option value={project.id!} key={project.id!}>
                {project.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label
            htmlFor="time-entry-start"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Start Date &amp; Time
          </label>
          <input
            type="datetime-local"
            name="start"
            id="time-entry-start"
            className="w-full rounded focus:ring-violet-400 focus:border-violet-400"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="time-entry-end"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            End Date &amp; Time
          </label>
          <input
            type="datetime-local"
            name="end"
            id="time-entry-end"
            className="w-full rounded focus:ring-violet-400 focus:border-violet-400"
          />
        </fieldset>
      </section>
      <section className="w-full p-2 space-y-2 overflow-y-auto rounded-lg md:w-1/2 max-h-48 md:max-h-72 dark:bg-white/10 bg-zinc-200">
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

export default TimeEntryForm;
