import React, { useCallback, useEffect, useState } from "react";
import { add, format, set, sub } from "date-fns";

import { TimeEntry } from "../types/toggl";
import TimeEntryItem from "./time-entry-item";
import { useTogglStore } from "../store";

interface EntryDay {
  date: Date;
  entries: TimeEntry[];
}

interface TimeEntriesWidgetProps {
  handleEdit: (entry: TimeEntry) => void;
}

const TimeEntriesWidget: React.FC<TimeEntriesWidgetProps> = ({
  handleEdit,
}) => {
  const [days, setDays] = useState<EntryDay[]>([]);
  const { projects, timeEntries } = useTogglStore((state) => ({
    projects: state.projects,
    timeEntries: state.timeEntries,
  }));

  const buildDaysList = useCallback(() => {
    const daysList: EntryDay[] = [];
    const today = set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    if (timeEntries) {
      Object.keys([...new Array(7)]).forEach((_, index) => {
        const day = sub(today, { days: index });
        daysList.push({
          date: day,
          entries: timeEntries
            .filter(
              (entry) =>
                new Date(entry.stop!) > day &&
                new Date(entry.stop!) < add(day, { days: 1 }) &&
                entry.duration
            )
            .reverse(),
        });
      });
    } else {
      Object.keys([...new Array(7)]).forEach((_, index) => {
        daysList.push({ date: sub(today, { days: index }), entries: [] });
      });
    }
    return daysList;
  }, [timeEntries]);

  useEffect(() => {
    setDays(buildDaysList());
  }, [buildDaysList]);

  return (
    <ul className="relative overflow-y-auto bg-white border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 max-h-96">
      {days.map((day, index) => (
        <div key={day.date.toISOString()}>
          {index === 0 && (
            <h4
              className="sticky top-0 z-[5] px-6 pt-4 pb-4 font-semibold bg-white border-b dark:border-zinc-600 dark:bg-zinc-800"
              key={`header-${day.date.toISOString()}`}
            >
              Today
            </h4>
          )}

          {index === 1 && (
            <h4
              className="sticky top-0 z-[5] px-6 pt-4 pb-4 font-semibold bg-white border-b dark:border-zinc-600 dark:bg-zinc-800"
              key={`header-${day.date.toISOString()}`}
            >
              Yesterday
            </h4>
          )}

          {index > 1 && (
            <h4
              className="sticky top-0 z-[5] flex items-center justify-between px-6 pt-4 pb-4 font-semibold bg-white border-b dark:border-zinc-600 dark:bg-zinc-800"
              key={`header-${day.date.toISOString()}`}
            >
              <span>{format(day.date, "eeee")}</span>

              <span>{format(day.date, "P")}</span>
            </h4>
          )}

          {day.entries.length === 0 && (
            <div
              className="flex items-center justify-center w-full h-16"
              key={`body-${day.date.toISOString()}`}
            >
              <p className="text-opacity-75">🏝&nbsp;🍹&nbsp;🧘</p>
            </div>
          )}

          {day.entries.map((entry) => (
            <TimeEntryItem
              entry={entry}
              handleEdit={handleEdit}
              key={entry.id}
              project={
                entry.pid
                  ? projects.find(
                      (projectObj) => projectObj.id! === entry.pid
                    ) || null
                  : null
              }
            />
          ))}
        </div>
      ))}
    </ul>
  );
};

export default TimeEntriesWidget;
