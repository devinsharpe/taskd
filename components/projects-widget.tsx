import { Client, Project } from "../types/toggl";
import React, { useEffect, useState } from "react";
import {
  UilAngleLeft,
  UilAngleRight,
  UilCalendarAlt,
  UilEditAlt,
  UilPlay,
  UilPlus,
  UilTagAlt,
} from "@iconscout/react-unicons";

import Button from "./button";
import { motion } from "framer-motion";
import { useTogglStore } from "../store";

interface ProjectsWidgetProps {
  handleEdit: (pid: number) => void;
  handleNew: (cid: number) => void;
  handleNewEvent: (pid: number) => void;
  handleStart: (pid: number) => void;
  handleTagEdit: () => void;
}

const ProjectsWidget: React.FC<ProjectsWidgetProps> = ({
  handleEdit,
  handleNew,
  handleNewEvent,
  handleStart,
  handleTagEdit,
}) => {
  const { clients, projects } = useTogglStore((state) => ({
    clients: state.clients,
    projects: state.projects,
  }));
  const [clientFilter, setClientFilter] = useState("-1");
  const [clientsMap, setClientsMap] = useState<{ [key: number]: Client }>({});
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setClientsMap(
      clients.reduce((prev, current) => {
        prev[current.id!] = current;
        return prev;
      }, {} as { [key: number]: Client })
    );
  }, [clients]);

  useEffect(() => {
    setMaxPage(Math.ceil(filteredProjects.length / 6));
  }, [filteredProjects]);

  useEffect(() => {
    if (clientFilter === "-1") {
      setFilteredProjects([...projects.filter((project) => project.active)]);
    } else {
      setFilteredProjects(
        [
          ...projects.filter(
            (project) =>
              project.active &&
              project.cid &&
              project.cid.toString() === clientFilter
          ),
        ].sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    }
    setPage(1);
  }, [clientFilter, setFilteredProjects, projects]);

  return (
    <section className="box-border w-full mb-4 space-y-4 overflow-hidden md:mx-4 break-inside group">
      <div className="items-center justify-between p-4 pb-2 space-y-4 lg:space-x-2 lg:flex lg:space-y-0">
        <h4 className="text-4xl font-bold transition-colors duration-500 text-zinc-800 dark:text-zinc-200 group-hover:text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-teal-600">
          Projects.
        </h4>
        <div className="flex items-center justify-between space-x-2 lg:justify-end">
          <select
            name="client-choices"
            id="client-choices"
            className="rounded-lg bg-zinc-200 focus:border-emerald-600 focus:ring-emerald-600"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="-1">All Clients</option>
            {clients.map((client) => (
              <option value={client.id!} key={client.id!}>
                {client.name}
              </option>
            ))}
          </select>
          <button className="secondary" type="button" onClick={handleTagEdit}>
            <UilTagAlt />
          </button>
          <button
            className="secondary"
            onClick={() => handleNew(parseInt(clientFilter, 10))}
            type="button"
          >
            <UilPlus />
          </button>
        </div>
      </div>
      <div className="px-2 pb-4 space-y-4">
        {projects.length ? (
          <>
            {filteredProjects.slice((page - 1) * 6, page * 6).map((project) => (
              <article
                key={project.id!}
                className="relative flex items-center px-4 py-2 overflow-hidden bg-white border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 hover:border-black dark:hover:border-white group"
              >
                <div className="w-full truncate">
                  <button
                    className="z-10 text-xl font-semibold text-left md:text-2xl hover:underline dark:text-white"
                    onClick={() => handleEdit(project.id!)}
                  >
                    {project.name}
                  </button>

                  {project.cid && clientsMap[project.cid] && (
                    <h5 className="text-sm">{clientsMap[project.cid].name}</h5>
                  )}
                </div>
                <div className="flex items-end justify-end space-x-4">
                  <button
                    className="flex items-center justify-center p-2 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    onClick={() => handleNewEvent(project.id!)}
                  >
                    <UilCalendarAlt />
                  </button>
                  <button
                    className="flex items-center justify-center p-2 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    onClick={() => handleStart(project.id!)}
                  >
                    <UilPlay />
                  </button>
                </div>
              </article>
            ))}
            {filteredProjects.length === 0 && (
              <>
                {Object.keys([...Array(6)]).map((key) => (
                  <article
                    key={key}
                    className="relative flex items-center justify-center  dark:text-white overflow-hidden bg-white border rounded-lg h-[4.375rem] dark:bg-zinc-800 dark:border-zinc-600 hover:border-black dark:hover:border-white group"
                  >
                    <button
                      className="flex items-center justify-center px-8 py-2 space-x-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-emerald-600"
                      onClick={() => handleNew(parseInt(clientFilter, 10))}
                    >
                      <UilPlus />
                      <h4 className="text-lg font-semibold">New Project</h4>
                    </button>
                  </article>
                ))}
              </>
            )}
            {page == maxPage && filteredProjects.length % 6 > 0 && (
              <>
                {Object.keys([...Array(6 - (filteredProjects.length % 6))]).map(
                  (key) => (
                    <article
                      key={key}
                      className="relative flex items-center justify-center  dark:text-white overflow-hidden bg-white border rounded-lg h-[4.375rem] dark:bg-zinc-800 dark:border-zinc-600 hover:border-black dark:hover:border-white group"
                    >
                      <button
                        className="flex items-center justify-center px-8 py-2 space-x-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-emerald-600"
                        onClick={() => handleNew(parseInt(clientFilter, 10))}
                      >
                        <UilPlus />
                        <h4 className="text-lg font-semibold">New Project</h4>
                      </button>
                    </article>
                  )
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full col-span-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="secondary"
            >
              Start a Project
            </motion.button>
          </div>
        )}
        <div className="flex items-stretch justify-center w-full col-span-2 space-x-4">
          <Button
            variant="secondary"
            scaleOnHover
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <UilAngleLeft />
          </Button>
          <div className="flex items-center justify-center w-full text-white rounded-lg shadow-lg bg-zinc-600 dark:bg-zinc-300 dark:text-zinc-800">
            {page} / {maxPage}
          </div>
          <Button
            variant="secondary"
            scaleOnHover
            onClick={() => {
              if (page < maxPage) {
                setPage(page + 1);
              }
            }}
          >
            <UilAngleRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsWidget;
