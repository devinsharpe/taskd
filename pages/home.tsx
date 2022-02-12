import { Client, Project, TimeEntry } from "../types/toggl";
import { differenceInSeconds, format, getUnixTime } from "date-fns";
import { formatDateTime, parseDateTime } from "../lib/date-time-helpers";
import { useEffect, useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import ActionBar from "../components/action-bar";
import ClientForm from "../components/client-form";
import ConfirmationDialog from "../components/confirmation-dialog";
import CurrentTimeEntry from "../components/current-time-entry";
import EventForm from "../components/event-form";
import EventsWidget from "../components/events-widget";
import Modal from "../components/modal";
import type { NextPage } from "next";
import ProjectForm from "../components/project-form";
import ProjectsWidget from "../components/projects-widget";
import { SoundEffects } from "./_app";
import TaskForm from "../components/task-form";
import TasksWidget from "../components/tasks-widget";
import TimeEntriesWidget from "../components/time-entries-widget";
import TimeEntryForm from "../components/time-entry-form";
import useSoundEffect from "../hooks/useSoundEffect";
import useToggl from "../hooks/useToggl";

const Home: NextPage = () => {
  const { clients, currentWorkspace, projects, setClients, setProjects } =
    useTogglStore((state) => ({
      clients: state.clients,
      currentWorkspace: state.currentWorkspace,
      projects: state.projects,
      setClients: state.setClients,
      setProjects: state.setProjects,
    }));
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { account } = useUserStore((state) => ({
    account: state.account,
  }));
  const [today, _] = useState(new Date());

  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<{
    id: number;
    model: "client" | "event" | "project" | "task" | "time_entry" | null;
  }>({ id: -1, model: null });

  const [clientDraft, setClientDraft] = useState<Client>({
    id: -1,
    wid: currentWorkspace,
    name: "",
    notes: "",
  });
  const [projectDraft, setProjectDraft] = useState<Project>({
    id: -1,
    cid: -1,
    wid: currentWorkspace,
    name: "",
    active: true,
    is_private: true,
    color: "1",
  });
  const [timeEntryDraft, setTimeEntryDraft] = useState<TimeEntry>({
    id: -1,
    pid: -1,
    wid: currentWorkspace,
    description: "",
    tags: [],
    start: formatDateTime(new Date()),
    stop: "",
    created_with: process.env.NEXT_PUBLIC_TOGGL_APP_NAME!,
    duronly: false,
  });

  const [loadingStatus, setLoadingStatus] = useState({
    client: false,
    delete: false,
    event: false,
    project: false,
    task: false,
    time_entry: false,
  });
  const [modalStatus, setModalStatus] = useState({
    client: false,
    event: false,
    project: false,
    task: false,
    time_entry: false,
  });

  const { playSoundEffect } = useSoundEffect();
  const { client, project, timeEntry, workspace } = useToggl();

  useEffect(() => {
    if (!modalStatus.client) {
      setClientDraft({ id: -1, wid: currentWorkspace, name: "", notes: "" });
    }
    if (!modalStatus.project) {
      setProjectDraft({
        id: -1,
        cid: -1,
        wid: currentWorkspace,
        name: "",
        active: true,
        is_private: true,
        color: "1",
      });
    }
    if (!modalStatus.time_entry) {
      setTimeEntryDraft({
        id: -1,
        pid: -1,
        wid: currentWorkspace,
        description: "",
        tags: [],
        start: formatDateTime(new Date()),
        stop: "",
        created_with: process.env.NEXT_PUBLIC_TOGGL_APP_NAME!,
        duronly: false,
      });
    }
  }, [modalStatus, currentWorkspace]);

  const saveClient: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setLoadingStatus({ ...loadingStatus, client: true });
    if (clientDraft.id && clientDraft.id > 0) {
      const updatedClient = await client.update({
        id: clientDraft.id!,
        ...clientDraft,
      });
      if (updatedClient) {
        setClients(
          clients
            .map((client) =>
              client.id === updatedClient.id ? updatedClient : client
            )
            .sort((a, b) => (a.name > b.name ? -1 : 1))
        );
        setModalStatus({ ...modalStatus, client: false });
        playSoundEffect(SoundEffects.interfaceSuccess);
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your client could not be saved.",
          status: "ERROR",
          duration: 1000,
          isClosable: true,
        });
        playSoundEffect(SoundEffects.interfaceError);
      }
    } else {
      const clientCopy = { ...clientDraft };
      delete clientCopy.id;
      const newClient = await client.create(clientCopy);
      if (newClient) {
        setClients(
          [...clients, newClient].sort((a, b) => (a.name > b.name ? -1 : 1))
        );
        setModalStatus({ ...modalStatus, client: false });
        playSoundEffect(SoundEffects.interfaceSuccess);
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your client could not be saved.",
          status: "ERROR",
          duration: 1000,
          isClosable: true,
        });
        playSoundEffect(SoundEffects.interfaceError);
      }
    }
    setLoadingStatus({ ...loadingStatus, client: false });
  };

  const saveProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setLoadingStatus({ ...loadingStatus, project: true });
    if (projectDraft.id && projectDraft.id > 0) {
      if (projectDraft.cid! === -1) {
        delete projectDraft.cid;
      }
      const updatedProject = await project.update({
        id: projectDraft.id!,
        ...projectDraft,
      });
      if (updatedProject) {
        setProjects(
          projects
            .map((project) =>
              project.id === updatedProject.id ? updatedProject : project
            )
            .sort((a, b) => (b.name > a.name ? -1 : 1))
        );
        setModalStatus({ ...modalStatus, project: false });
        playSoundEffect(SoundEffects.interfaceSuccess);
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your project could not be saved.",
          status: "ERROR",
          duration: 10000,
          isClosable: true,
        });
        playSoundEffect(SoundEffects.interfaceError);
      }
    } else {
      const projectCopy = { ...projectDraft };
      delete projectCopy.id;
      const newProject = await project.create(projectCopy);
      if (newProject) {
        setProjects(
          [...projects, newProject].sort((a, b) => (a.name > b.name ? -1 : 1))
        );
        setModalStatus({ ...modalStatus, project: false });
        playSoundEffect(SoundEffects.interfaceSuccess);
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your project could not be saved.",
          status: "ERROR",
          duration: 10000,
          isClosable: true,
        });
        playSoundEffect(SoundEffects.interfaceError);
      }
    }

    setLoadingStatus({ ...loadingStatus, project: false });
  };

  const saveTimeEntry: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setLoadingStatus({ ...loadingStatus, time_entry: true });
    if (timeEntryDraft.id && timeEntryDraft.id > 0) {
      try {
        const newTimeEntry = await timeEntry.update({
          ...timeEntryDraft,
          id: timeEntryDraft.id!,
          start: parseDateTime(timeEntryDraft.start!).toISOString(),
          stop: timeEntryDraft.stop
            ? parseDateTime(timeEntryDraft.stop).toISOString()
            : "",
          duration: differenceInSeconds(
            parseDateTime(timeEntryDraft.stop!),
            parseDateTime(timeEntryDraft.start!)
          ),
        });
        if (newTimeEntry && newTimeEntry.stop) {
          setCurrentEntry(null);
        } else {
          setCurrentEntry(newTimeEntry || null);
        }
        setModalStatus({ ...modalStatus, time_entry: false });
        playSoundEffect(SoundEffects.interfaceSuccess);
      } catch (err) {
        console.log(err);
        pushToast({
          title: "Something went wrong.",
          description: "Your time entry could not be saved.",
          status: "ERROR",
          duration: 10000,
          isClosable: true,
        });
        playSoundEffect(SoundEffects.interfaceError);
      }
    } else {
      const timeEntryCopy = {
        ...timeEntryDraft,
        start: parseDateTime(timeEntryDraft.start!).toISOString(),
      };
      delete timeEntryCopy.id;
      if (timeEntryDraft.stop) {
        try {
          await timeEntry.create({
            ...timeEntryCopy,
            stop: parseDateTime(timeEntryCopy.stop!).toISOString(),
            duration: differenceInSeconds(
              parseDateTime(timeEntryDraft.stop!),
              parseDateTime(timeEntryDraft.start!)
            ),
          });
          setCurrentEntry(null);
          setModalStatus({ ...modalStatus, time_entry: false });
          playSoundEffect(SoundEffects.interfaceSuccess);
        } catch (err) {
          console.log(err);
          pushToast({
            title: "Something went wrong.",
            description: "Your time entry could not be saved.",
            status: "ERROR",
            duration: 10000,
            isClosable: true,
          });
          playSoundEffect(SoundEffects.interfaceError);
        }
      } else {
        try {
          delete timeEntryCopy.stop;
          const newTimeEntry = await timeEntry.start(timeEntryCopy);
          setCurrentEntry(newTimeEntry || null);
          setModalStatus({ ...modalStatus, time_entry: false });
          playSoundEffect(SoundEffects.interfaceSuccess);
        } catch (err) {
          console.log(err);
          pushToast({
            title: "Something went wrong.",
            description: "Your time entry could not be saved.",
            status: "ERROR",
            duration: 10000,
            isClosable: true,
          });
          playSoundEffect(SoundEffects.interfaceError);
        }
      }
    }
    setLoadingStatus({ ...loadingStatus, time_entry: false });
  };

  const deleteClient = async (id: number) => {
    await client.delete(id);
    setClients((await client.list()) || []);
  };

  const deleteProject = async (id: number) => {
    const projectObj = projects.find((proj) => proj.id === id);
    if (projectObj) {
      await project.update({ ...projectObj, id, active: false });
      setProjects((await workspace.listProjects(currentWorkspace)) || []);
    }
  };

  const deleteTimeEntry = async (id: number) => {
    await timeEntry.delete(id);
    if (currentEntry && id === currentEntry.id) {
      setCurrentEntry(null);
    }
  };

  const handleDelete = async () => {
    setLoadingStatus({ ...loadingStatus, delete: true });
    switch (deleteCandidate.model) {
      case "client":
        await deleteClient(deleteCandidate.id);
        setModalStatus({ ...modalStatus, client: false });
        break;
      case "event":
        // TODO: Event Delete Logic
        break;
      case "project":
        await deleteProject(deleteCandidate.id);
        setModalStatus({ ...modalStatus, project: false });
        break;
      case "task":
        // TODO: "Task Delete Logic"
        break;
      case "time_entry":
        await deleteTimeEntry(deleteCandidate.id);
        setModalStatus({ ...modalStatus, time_entry: false });
        break;
      default:
        break;
    }
    setDeleteCandidate({ id: -1, model: null });
    setLoadingStatus({ ...loadingStatus, delete: false });
  };

  return (
    <div>
      <ConfirmationDialog
        isLoading={loadingStatus.delete}
        isOpen={deleteCandidate.id !== -1}
        title="Are you sure?"
        subtitle={`Deleting this ${
          deleteCandidate.model === "time_entry"
            ? "time entry"
            : deleteCandidate.model
        } is irreversible.`}
        message="It's dangerous to go alone. Confirm that deleting this is the proper step you want to take while on your journey."
        onClose={(choice) => {
          if (choice) {
            handleDelete();
          } else {
            setDeleteCandidate({ id: -1, model: null });
          }
        }}
      />
      <ActionBar
        handleActionRequest={(action) => {
          setModalStatus({ ...modalStatus, [action.toLowerCase()]: true });
        }}
      />
      <Modal
        isOpen={modalStatus.client}
        onClose={() => setModalStatus({ ...modalStatus, client: false })}
        title={clientDraft.id! === -1 ? "New Client" : "Edit Client"}
        isClosable={true}
      >
        <ClientForm
          client={clientDraft}
          onChange={setClientDraft}
          handleClose={() => setModalStatus({ ...modalStatus, client: false })}
          handleSubmit={saveClient}
          isLoading={loadingStatus.client}
        />
      </Modal>
      <Modal
        isOpen={modalStatus.event}
        onClose={() => setModalStatus({ ...modalStatus, event: false })}
        title="New Event"
        isClosable={true}
      >
        <EventForm
          handleClose={() => setModalStatus({ ...modalStatus, event: false })}
        />
      </Modal>
      <Modal
        isOpen={modalStatus.project}
        onClose={() => setModalStatus({ ...modalStatus, project: false })}
        title={projectDraft.id! === -1 ? "New Project" : "Edit Project"}
        isClosable={true}
      >
        <ProjectForm
          project={projectDraft}
          onChange={setProjectDraft}
          handleClose={() => setModalStatus({ ...modalStatus, project: false })}
          handleDelete={(pid: number) => {
            setDeleteCandidate({ id: pid, model: "project" });
          }}
          handleSubmit={saveProject}
          isLoading={loadingStatus.project}
        />
      </Modal>
      <Modal
        isOpen={modalStatus.task}
        onClose={() => setModalStatus({ ...modalStatus, task: false })}
        title="New Task"
        isClosable={true}
      >
        <TaskForm
          handleClose={() => setModalStatus({ ...modalStatus, task: false })}
        />
      </Modal>
      <Modal
        isOpen={modalStatus.time_entry}
        onClose={() => setModalStatus({ ...modalStatus, time_entry: false })}
        title={timeEntryDraft.id! === -1 ? "New Time Entry" : "Edit Time Entry"}
        isClosable={true}
      >
        <TimeEntryForm
          isLoading={loadingStatus.time_entry}
          timeEntry={timeEntryDraft}
          handleClose={() =>
            setModalStatus({ ...modalStatus, time_entry: false })
          }
          handleDelete={(id) => {
            setDeleteCandidate({ id, model: "time_entry" });
          }}
          handleSubmit={saveTimeEntry}
          onChange={setTimeEntryDraft}
        />
      </Modal>
      <div className="container min-h-screen mx-auto">
        <header className="w-full px-4 py-8 space-y-4 md:px-8">
          <div>
            <h2 className="text-xl font-semibold opacity-50">
              Hello {`${account!.firstName} ${account!.lastName}`}
            </h2>
            <h3 className="text-2xl font-bold tracking-wide">
              {format(today, "LLLL d, yyyy")}
            </h3>
          </div>
        </header>
        <main className="box-border h-full px-2 pb-16 mx-auto md:masonry-2-col before:box-inherit after:box-inherit md:px-0">
          <section className="box-border w-full p-4 mb-4 space-y-8 overflow-hidden md:mx-4 break-inside group ">
            <h4 className="text-4xl font-bold transition-colors duration-300 group-hover:text-violet-600">
              Time Entries.
            </h4>
            <CurrentTimeEntry
              currentEntry={currentEntry}
              handleEdit={(timeEntry) => {
                setTimeEntryDraft({
                  ...timeEntry,
                  start: formatDateTime(new Date(timeEntry.start!)),
                });
                setModalStatus({ ...modalStatus, time_entry: true });
              }}
              handleStart={() =>
                setModalStatus({ ...modalStatus, time_entry: true })
              }
              setCurrentEntry={setCurrentEntry}
            />

            <TimeEntriesWidget />
          </section>
          <TasksWidget />
          <EventsWidget />
          <ProjectsWidget
            handleNew={(cid) => {
              setProjectDraft({ ...projectDraft, cid });
              setModalStatus({ ...modalStatus, project: true });
            }}
            handleNewEvent={(pid) => {
              console.log(pid);
              setModalStatus({ ...modalStatus, event: true });
            }}
            handleEdit={(pid) => {
              const projectObj = projects.filter(
                (project) => project.id! === pid
              )[0];
              setProjectDraft({ ...projectObj });
              setModalStatus({ ...modalStatus, project: true });
            }}
            handleStart={(pid) => {
              setTimeEntryDraft({ ...timeEntryDraft, pid });
              setModalStatus({ ...modalStatus, time_entry: true });
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
