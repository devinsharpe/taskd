import { Client, TimeEntry } from "../types/toggl";
import React, { useEffect, useState } from "react";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";

import Button from "./button";
import { format } from "date-fns";
import { useTogglStore } from "../store";

interface TimeEntryFormProps {
  editTimeEntry?: TimeEntry;
  isNew: boolean;
  handleClose: () => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({
  editTimeEntry,
  handleClose,
}) => {
  const { currentWorkspace, projects, tags } = useTogglStore((state) => ({
    currentWorkspace: state.currentWorkspace,
    projects: state.projects,
    tags: state.tags,
  }));
  const [timeEntry, setTimeEntry] = useState<TimeEntry>({
    id: -1,
    wid: currentWorkspace,
    pid: -1,
    description: "",
    created_with: process.env.NEXT_PUBLIC_TOGGL_APP_NAME!,
    tags: [] as string[],
    duronly: false,
    start: new Date().toLocaleString(),
    stop: "",
  });

  useEffect(() => {
    if (editTimeEntry) {
      setTimeEntry({ ...timeEntry, ...editTimeEntry });
    } else {
      setTimeEntry({
        id: -1,
        wid: currentWorkspace,
        pid: -1,
        description: "",
        created_with: process.env.NEXT_PUBLIC_TOGGL_APP_NAME!,
        tags: [] as string[],
        duronly: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTimeEntry, setTimeEntry]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4 modal-body">
        <fieldset className="w-full">
          <label
            htmlFor="time-entry-description"
            className="text-lg font-semibold text-zinc-800 dark:text-white"
          >
            Description
          </label>
          <input
            autoFocus
            type="text"
            name="description"
            id="time-entry-description"
            className="w-full rounded focus:ring-violet-400 focus:border-violet-400"
            placeholder="What are you working on?"
            value={timeEntry.description}
            onChange={(e) =>
              setTimeEntry({ ...timeEntry, description: e.target.value })
            }
          />
        </fieldset>
        <div className="items-start w-full space-y-4 md:flex md:space-x-4 md:space-y-0">
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
                defaultValue="-1"
                value={timeEntry.pid}
                onChange={(e) =>
                  setTimeEntry({
                    ...timeEntry,
                    pid: parseInt(e.target.value, 10),
                  })
                }
              >
                <option value="-1">None</option>
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
                Start Date &amp; Time <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="start"
                id="time-entry-start"
                className="w-full rounded focus:ring-violet-400 focus:border-violet-400"
                required
                value={
                  timeEntry.start
                    ? timeEntry.start
                    : format(new Date(), "yyyy-MM-dd'T'HH:mm")
                }
                onChange={(e) =>
                  setTimeEntry({ ...timeEntry, start: e.target.value })
                }
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
                value={timeEntry.stop}
                onChange={(e) =>
                  setTimeEntry({ ...timeEntry, stop: e.target.value })
                }
              />
            </fieldset>
          </section>
          <section className="w-full p-2 space-y-2 overflow-y-auto rounded-lg md:w-1/2 max-h-48 md:max-h-72 dark:bg-zinc-600 bg-zinc-100">
            {tags.map((tag) => (
              <fieldset
                className="flex items-center px-2 space-x-2 space-y-0"
                key={tag.id!}
              >
                <input
                  type="checkbox"
                  name={`tag${tag.id!}`}
                  id={`tag-${tag.id!}`}
                  className="w-5 h-5 rounded text-violet-400 focus:border-violet-400 focus:outline-violet-400"
                  checked={timeEntry.tags.includes(tag.name)}
                  onChange={(e) =>
                    e.target.checked
                      ? setTimeEntry({
                          ...timeEntry,
                          tags: [...timeEntry.tags, tag.name],
                        })
                      : setTimeEntry({
                          ...timeEntry,
                          tags: [
                            ...timeEntry.tags.filter(
                              (tagItem) => tagItem === tag.name
                            ),
                          ],
                        })
                  }
                />
                <label
                  htmlFor={`tag-${tag.id!}`}
                  className="text-zinc-800 dark:text-white"
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
          type="button"
        >
          <UilTimes />
          <span className="hidden md:inline">Close</span>
        </button>
        <Button scaleOnHover variant="primary" className="w-full" type="submit">
          <div className="flex items-center w-full space-x-2">
            <UilCheck />
            <span>Add Time Entry</span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

TimeEntryForm.defaultProps = {
  isNew: true,
};

export default TimeEntryForm;
