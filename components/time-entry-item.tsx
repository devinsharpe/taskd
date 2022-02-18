import { Project, TimeEntry } from "../types/toggl";
import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";

import { UilTagAlt } from "@iconscout/react-unicons";
import parseSeconds from "../lib/parseSeconds";

interface TimeEntryItemProps {
  entry: TimeEntry;
  handleEdit: (entry: TimeEntry) => void;
  project: Project | null;
}

const TimeEntryItem: React.FC<TimeEntryItemProps> = ({
  entry,
  handleEdit,
  project,
}) => {
  const [duration, setDuration] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setDuration(parseSeconds(entry.duration!));
  }, [entry, setDuration]);
  return (
    <li className="flex items-start justify-between px-4 py-2 list-none">
      <div>
        <button
          className="px-2 pb-1 text-violet-600 focus:outline-violet-600"
          onClick={() => handleEdit(entry)}
        >
          {project ? (
            <h5 className="text-lg font-bold transition-colors duration-300 hover:underline whitespace-nowrap">
              {project.name}
            </h5>
          ) : (
            <h5 className="text-lg font-bold transition-colors duration-300 whitespace-nowrap">
              No Project
            </h5>
          )}
        </button>

        <div className="flex flex-wrap items-center pl-2 space-x-2 text-zinc-800 dark:text-white">
          {entry.description && (
            <p className="pb-1 font-semibold opacity-75 whitespace-nowrap">
              {entry.description}
            </p>
          )}
          {entry.tags && <UilTagAlt size="16" />}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full text-right">
        <p>{`${duration.hours}:${duration.minutes
          .toString()
          .padStart(2, "0")}:${duration.seconds
          .toString()
          .padStart(2, "0")}`}</p>
        <p>
          {format(new Date(entry.start!), "p")} &ndash;{" "}
          {format(new Date(entry.stop!), "p")}
        </p>
      </div>
    </li>
  );
};

export default TimeEntryItem;
