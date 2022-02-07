import React from "react";
import { useTogglStore } from "../store";

const EventForm = () => {
  const { projects, tags } = useTogglStore((state) => ({
    projects: state.projects,
    tags: state.tags,
  }));
  return (
    <form
      className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset>
        <label
          htmlFor="event-start"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Start
        </label>
        <input
          type="datetime-local"
          name="start"
          id="event-start"
          className="w-full rounded focus:border-teal-400 focus:ring-teal-400"
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor="event-end"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          End
        </label>
        <input
          type="datetime-local"
          name="end"
          id="event-end"
          className="w-full rounded focus:border-teal-400 focus:ring-teal-400"
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor="event-project"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Project
        </label>
        <select
          name="project"
          id="event-project"
          className="w-full rounded focus:border-teal-400 focus:ring-teal-400"
        >
          <option value="none">None</option>
          {projects.map((project) => (
            <option value={project.id!} key={project.id!}>
              {project.name}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="flex flex-col items-start justify-end h-full">
        <div className="flex items-center w-full p-2 space-x-2 rounded dark:bg-zinc-700 bg-zinc-200">
          <input
            type="checkbox"
            name="isAllDay"
            id="event-all-day"
            className="text-teal-400 rounded focus:border-teal-600 focus:outline-teal-400"
          />
          <label
            htmlFor="event-all-day"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            All Day?
          </label>
        </div>
      </fieldset>

      <fieldset>
        <label
          htmlFor="event-title"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="event-title"
          className="w-full focus:ring-teal-400 focus:border-teal-400"
          placeholder="Client Meeting"
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor="event-url"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          URL
        </label>
        <input
          type="text"
          name="url"
          id="event-url"
          className="w-full focus:ring-teal-400 focus:border-teal-400"
          placeholder="https://www.zoom.us/meeting/1234"
        />
      </fieldset>

      <fieldset>
        <label
          htmlFor="event-notes"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Notes
        </label>
        <textarea
          name="notes"
          id="event-notes"
          className="w-full h-32 rounded focus:ring-teal-400 focus:border-teal-400"
        />
      </fieldset>

      <div className="w-full p-2 space-y-2 overflow-y-auto rounded bg-zinc-200 max-h-[10.5rem] dark:bg-white/10">
        {tags.map((tag) => (
          <fieldset
            className="flex items-center px-2 space-x-2 space-y-0"
            key={tag.id!}
          >
            <input
              type="checkbox"
              name={`tag${tag.id!}`}
              id={`tag-${tag.id!}`}
              className="w-5 h-5 text-teal-400 rounded focus:border-teal-600 focus:outline-teal-400"
            />
            <label
              htmlFor={`tag-${tag.id!}`}
              className="block text-zinc-800 dark:text-white"
            >
              {tag.name}
            </label>
          </fieldset>
        ))}
      </div>
    </form>
  );
};

export default EventForm;
