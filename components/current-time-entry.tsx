import { Project, TimeEntry } from "../types/toggl";
import { UilPause, UilPlay, UilStopwatch } from "@iconscout/react-unicons";
import parseSeconds, { formatSeconds } from "../lib/parseSeconds";
import { useEffect, useState } from "react";

import Button from "./button";
import { SoundEffects } from "../pages/_app";
import { differenceInSeconds } from "date-fns";
import useInterval from "../hooks/useInterval";
import useSoundEffect from "../hooks/useSoundEffect";
import useToggl from "../hooks/useToggl";
import { useTogglStore } from "../store";

interface CurrentTimeEntryProps {
  currentEntry: TimeEntry | null;
  handleEdit: (timeEntry: TimeEntry) => void;
  handleStart: () => void;
  setCurrentEntry: (timeEntry: TimeEntry | null) => void;
}

const CurrentTimeEntry: React.FC<CurrentTimeEntryProps> = ({
  currentEntry,
  handleEdit,
  handleStart,
  setCurrentEntry,
}) => {
  const { timeEntry } = useToggl();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [duration, setDuration] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useTogglStore((state) => ({ projects: state.projects }));
  const { playSoundEffect } = useSoundEffect();

  useEffect(() => {
    timeEntry.current().then((entry) => {
      if (entry) {
        const entryProjectDetails = projects.find(
          (project) => project.id! === entry.pid
        );
        setCurrentProject(entryProjectDetails ? entryProjectDetails : null);
      }
      setCurrentEntry(entry ? entry : null);
    });
  }, [timeEntry, projects, setCurrentEntry]);

  useInterval(() => {
    if (currentEntry && currentEntry.start) {
      const seconds = parseSeconds(
        differenceInSeconds(new Date(), new Date(currentEntry.start))
      );
      setDuration(seconds);
      document.title = `${
        currentProject ? currentProject.name : currentEntry.description
      } - ${formatSeconds(seconds)}`;
    } else {
      setDuration(null);
      document.title = "Task'd";
    }
  }, 1000);

  useInterval(async () => {
    const entry = await timeEntry.current();
    setCurrentEntry(entry || null);
    if (entry && entry.pid) {
      const entryProjectDetails = projects.find(
        (project) => project.id! === entry.pid
      );
      setCurrentProject(entryProjectDetails || null);
    } else {
      setCurrentProject(null);
    }
  }, 30000);

  const stopEntry = async () => {
    if (currentEntry) {
      setIsLoading(true);
      await timeEntry.stop(currentEntry.id!);
      setCurrentEntry(null);
      setCurrentProject(null);
      setIsLoading(false);
      playSoundEffect(SoundEffects.interfaceSuccess);
    }
  };

  return (
    <>
      {currentEntry ? (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-lg dark:bg-zinc-800 dark:hover:border-white dark:border-zinc-800 hover:border-black">
          <div>
            {currentProject ? (
              <div className="flex items-center pb-1 space-x-1">
                <div className="text-violet-600">
                  <UilStopwatch />
                </div>
                <button
                  className="px-2 text-violet-600 focus:outline-violet-600"
                  onClick={() => handleEdit(currentEntry)}
                >
                  <h4 className="text-2xl font-bold transition-colors duration-300 hover:underline">
                    {currentProject.name}
                  </h4>
                </button>
              </div>
            ) : (
              <h4 className="pb-1 text-2xl font-bold transition-colors duration-300">
                No Project
              </h4>
            )}
            {currentEntry.description && (
              <p className="pb-1 text-lg font-semibold opacity-75">
                {currentEntry.description}
              </p>
            )}
            <div className="flex flex-wrap items-center">
              {currentEntry.tags.map((tag) => (
                <p
                  className="px-2 py-1 mb-1 mr-1 rounded bg-zinc-200 dark:bg-zinc-700"
                  key={(Math.random() * 1000).toString()}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {duration !== null && (
              <p className="text-xl font-semibold">{formatSeconds(duration)}</p>
            )}
            <Button
              className="rounded-full"
              isLoading={isLoading}
              onClick={stopEntry}
            >
              <UilPause />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-lg dark:bg-zinc-800 dark:hover:border-white dark:border-zinc-800 hover:border-black">
          <div>
            <h4 className="py-1 text-2xl font-bold transition-colors duration-300">
              No Time Entry Running
            </h4>
            <h5 className="text-lg font-semibold opacity-75">
              Let&apos;s Get to Work
            </h5>
          </div>
          <Button className="rounded-full" scaleOnHover onClick={handleStart}>
            <UilPlay />
          </Button>
        </div>
      )}
    </>
  );
};

export default CurrentTimeEntry;
