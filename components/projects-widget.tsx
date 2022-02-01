import React, { useEffect, useState } from "react";
import {
  UilAngleLeft,
  UilAngleRight,
  UilEdit,
  UilEditAlt,
  UilPlay,
  UilPlus,
} from "@iconscout/react-unicons";

import Button from "./button";
import { Client, Project } from "../types/toggl";
import { motion } from "framer-motion";
import { useTogglStore } from "../store";

const ProjectsWidget: React.FC = () => {
  const { clients, projects } = useTogglStore((state) => ({
    clients: state.clients,
    projects: state.projects,
  }));
  const [clientFilter, setClientFilter] = useState("ALL");
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
    if (clientFilter === "ALL") {
      setFilteredProjects([...projects]);
    } else {
      setFilteredProjects([
        ...projects.filter(
          (project) => project.cid!.toString() === clientFilter
        ),
      ]);
    }
    setPage(1);
  }, [clientFilter, setFilteredProjects, projects]);

  return (
    <section className="box-border w-full mb-4 space-y-4 overflow-hidden md:mx-4 break-inside group">
      <div className="flex items-center justify-between p-4 pb-2 space-x-2">
        <h4 className="text-4xl font-bold transition-colors duration-300 group-hover:text-emerald-600">
          Projects.
        </h4>
        <div className="flex items-center space-x-2">
          <select
            name="client-choices"
            id="client-choices"
            className="rounded-lg bg-zinc-200 focus:border-emerald-600 focus:ring-emerald-600"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="ALL">All Clients</option>
            {clients.map((client) => (
              <option value={client.id!} key={client.id!}>
                {client.name}
              </option>
            ))}
          </select>
          <button className="secondary">
            <UilPlus />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-2 pb-4">
        {projects.length ? (
          <>
            {filteredProjects.slice((page - 1) * 6, page * 6).map((project) => (
              <article
                key={project.id!}
                className="relative flex flex-col items-start justify-start h-48 p-4 overflow-hidden bg-white border-2 border-white rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-800 hover:border-black dark:hover:border-white group"
              >
                <h4 className="z-10 text-xl font-semibold md:text-2xl">
                  {project.name}
                </h4>
                {project.cid && clientsMap[project.cid] && (
                  <h5 className="text-sm">{clientsMap[project.cid].name}</h5>
                )}
                <div className="flex items-end justify-center flex-grow w-full space-x-4">
                  <button className="flex items-center justify-center p-2 border border-black rounded-full dark:text-white dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    <UilPlay />
                  </button>
                  <button className="flex items-center justify-center p-2 border border-black rounded-full dark:text-white dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    <UilEditAlt />
                  </button>
                </div>
              </article>
            ))}
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
