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
    <li className="px-4 py-2 list-none ">
      <div className="flex items-center justify-between space-x-3">
        <button
          className="w-full px-2 py-1 text-lg font-bold text-left truncate transition-colors duration-300 dark:text-white hover:underline"
          onClick={() => handleEdit(entry)}
        >
          {project ? <>{project.name}</> : <>No Project</>}
        </button>
        <p className="whitespace-nowrap">{`${duration.hours}:${duration.minutes
          .toString()
          .padStart(2, "0")}:${duration.seconds
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
      <div className="flex items-center justify-between text-right whitespace-nowrap">
        <div className="flex flex-wrap items-center pl-2 space-x-2 text-zinc-800 dark:text-white">
          {entry.description && (
            <p className="pb-1 font-semibold opacity-75 whitespace-nowrap">
              {entry.description}
            </p>
          )}
          {entry.tags && <UilTagAlt size="16" />}
        </div>
        <p>
          {format(new Date(entry.start!), "p")} &ndash;{" "}
          {format(new Date(entry.stop!), "p")}
        </p>
      </div>
    </li>
  );
};

export default TimeEntryItem;
