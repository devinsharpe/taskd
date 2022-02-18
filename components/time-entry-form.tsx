import { Client, Project, TimeEntry } from "../types/toggl";
import React, { FormEventHandler, useEffect, useState } from "react";
import { UilCheck, UilTimes, UilTrashAlt } from "@iconscout/react-unicons";

import Button from "./button";
import GroupedProjectOptions from "./grouped-project-options";
import { format } from "date-fns";
import { formatDateTime } from "../lib/date-time-helpers";
import { useTogglStore } from "../store";

interface TimeEntryFormProps {
  isLoading: boolean;
  timeEntry: TimeEntry;
  handleClose: () => void;
  handleDelete: (id: number) => void;
  handleSubmit: FormEventHandler;
  onChange: (timeEntry: TimeEntry) => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({
  isLoading,
  timeEntry,
  handleClose,
  handleDelete,
  handleSubmit,
  onChange,
}) => {
  const { tags } = useTogglStore((state) => ({
    tags: state.tags,
  }));

  return (
    <form onSubmit={handleSubmit}>
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
              onChange({ ...timeEntry, description: e.target.value })
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
                value={timeEntry.pid}
                onChange={(e) =>
                  onChange({
                    ...timeEntry,
                    pid: parseInt(e.target.value, 10),
                  })
                }
              >
                <GroupedProjectOptions />
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
                  timeEntry.start ? timeEntry.start : formatDateTime(new Date())
                }
                onChange={(e) =>
                  onChange({ ...timeEntry, start: e.target.value })
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
                  onChange({ ...timeEntry, stop: e.target.value })
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
                      ? onChange({
                          ...timeEntry,
                          tags: [...timeEntry.tags, tag.name],
                        })
                      : onChange({
                          ...timeEntry,
                          tags: [
                            ...timeEntry.tags.filter(
                              (tagItem) => tagItem !== tag.name
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
        {timeEntry.id && timeEntry.id !== -1 ? (
          <button
            className="flex items-center secondary"
            onClick={() => handleDelete(timeEntry.id!)}
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
              {timeEntry.id && timeEntry.id === -1 ? "Add " : "Edit "}
              <span className="hidden md:inline-block">Time Entry</span>
            </span>
          </div>
        </Button>
      </footer>
    </form>
  );
};

export default TimeEntryForm;
