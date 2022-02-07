import { Project, TimeEntry } from "../types/toggl";
import { UilPause, UilPlay, UilStopwatch } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";

import Button from "./button";
import { differenceInSeconds } from "date-fns";
import useInterval from "../hooks/useInterval";
import useToggl from "../hooks/useToggl";
import { useTogglStore } from "../store";

const CurrentTimeEntry = () => {
  const { timeEntry } = useToggl();
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [duration, setDuration] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useTogglStore((state) => ({ projects: state.projects }));

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
  }, [timeEntry, projects]);

  useInterval(() => {
    if (currentEntry && currentEntry.start) {
      setDuration(
        differenceInSeconds(new Date(), new Date(currentEntry.start))
      );
    } else {
      setDuration(-1);
    }
  }, 1000);

  useInterval(async () => {
    const entry = await timeEntry.current();
    setCurrentEntry(entry || null);
  }, 10000);

  const stopEntry = async () => {
    if (currentEntry) {
      setIsLoading(true);
      await timeEntry.stop(currentEntry.id!);
      setCurrentEntry(null);
      setCurrentProject(null);
      setIsLoading(false);
    }
  };

  return (
    <section className="box-border w-full p-4 mb-4 space-y-4 overflow-hidden md:mx-4 break-inside group ">
      {currentEntry ? (
        <div className="flex items-center justify-between p-4 bg-white border-2 border-white rounded-lg shadow-lg dark:bg-zinc-800 dark:hover:border-white dark:border-zinc-800 hover:border-black">
          <div>
            {currentProject ? (
              <div className="flex items-center space-x-1">
                <div className="text-violet-600">
                  <UilStopwatch />
                </div>
                <button className="px-2 text-violet-600 focus:outline-violet-600">
                  <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-violet-600 hover:underline">
                    {currentProject.name}
                  </h4>
                </button>
              </div>
            ) : (
              <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-violet-600">
                No Project
              </h4>
            )}
            {currentEntry.description && (
              <p className="text-lg font-semibold opacity-75">
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
            {duration > -1 && (
              <p className="text-xl font-semibold">
                {Math.floor(duration / 3600)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor((duration % 3600) / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </p>
            )}
            <Button
              className="rounded-full"
              scaleOnHover
              isLoading={isLoading}
              onClick={stopEntry}
            >
              <UilPause />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-violet-600">
              No Time Entry Running
            </h4>
            <h5 className="text-lg font-semibold opacity-75">
              Let&apos;s Get to Work
            </h5>
          </div>
          <Button className="rounded-full" scaleOnHover>
            <UilPlay />
          </Button>
        </div>
      )}
    </section>
  );
};

export default CurrentTimeEntry;
