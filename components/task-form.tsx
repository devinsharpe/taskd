import { UilCheck, UilTimes } from "@iconscout/react-unicons";

import Button from "./button";
import GroupedProjectOptions from "./grouped-project-options";
import React from "react";
import { useTogglStore } from "../store";

interface TaskFormProps {
  handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose }) => {
  const { projects, tags } = useTogglStore((state) => ({
    projects: state.projects,
    tags: state.tags,
  }));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4 modal-body">
        <fieldset className="w-full">
          <label
            htmlFor="task-title"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Title
          </label>
          <input
            autoFocus
            name="title"
            id="task-title"
            type="text"
            placeholder="Client Meeting"
            className="w-full focus:ring-blue-400 focus:border-blue-400"
          />
        </fieldset>
        <div className="items-start w-full space-y-4 md:flex md:space-x-4 md:space-y-0">
          <section className="w-full space-y-4 md:w-1/2">
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
                className="w-full focus:ring-blue-400 focus:border-blue-400"
              >
                <GroupedProjectOptions />
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
                className="w-full focus:ring-blue-400 focus:border-blue-400"
              />
            </fieldset>
            <fieldset className="w-full">
              <label
                htmlFor="task-due-date"
                className="text-lg font-semibold text-zinc-800 dark:text-white"
              >
                Due Date
              </label>
              <input
                name="dueDate"
                id="task-due-date"
                type="date"
                className="w-full focus:ring-blue-400 focus:border-blue-400"
              />
            </fieldset>
          </section>
          <section className="w-full p-2 space-y-2 overflow-y-auto rounded-lg bg-zinc-100 md:w-1/2 max-h-48 md:max-h-[19rem] dark:bg-zinc-700">
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
        </div>
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
            <span>Add Task</span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

export default TaskForm;
