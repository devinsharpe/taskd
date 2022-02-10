import { useEffect, useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import ActionBar from "../components/action-bar";
import { Client } from "../types/toggl";
import ClientForm from "../components/client-form";
import CurrentTimeEntry from "../components/current-time-entry";
import EventForm from "../components/event-form";
import EventsWidget from "../components/events-widget";
import Modal from "../components/modal";
import type { NextPage } from "next";
import ProjectForm from "../components/project-form";
import ProjectsWidget from "../components/projects-widget";
import TaskForm from "../components/task-form";
import TasksWidget from "../components/tasks-widget";
import TimeEntryForm from "../components/time-entry-form";
import { format } from "date-fns";
import useToggl from "../hooks/useToggl";

const Home: NextPage = () => {
  const { clients, currentWorkspace, setClients } = useTogglStore((state) => ({
    clients: state.clients,
    currentWorkspace: state.currentWorkspace,
    setClients: state.setClients,
  }));
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { account } = useUserStore((state) => ({
    account: state.account,
  }));
  const [today, _] = useState(new Date());

  const [clientDraft, setClientDraft] = useState<Client>({
    id: -1,
    wid: currentWorkspace,
    name: "",
    notes: "",
  });

  const [loadingStatus, setLoadingStatus] = useState({
    client: false,
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

  const { client } = useToggl();

  useEffect(() => {
    if (!modalStatus.client) {
      setClientDraft({ id: -1, wid: currentWorkspace, name: "", notes: "" });
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
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your client could not be saved.",
          status: "ERROR",
          duration: 1000,
          isClosable: true,
        });
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
      } else {
        pushToast({
          title: "Something went wrong.",
          description: "Your client could not be saved.",
          status: "ERROR",
          duration: 1000,
          isClosable: true,
        });
      }
    }
    setLoadingStatus({ ...loadingStatus, client: false });
  };

  return (
    <div>
      <>
        <ActionBar
          handleActionRequest={(action) => {
            setModalStatus({ ...modalStatus, [action.toLowerCase()]: true });
          }}
        />
        <Modal
          isOpen={modalStatus.client}
          onClose={() => setModalStatus({ ...modalStatus, client: false })}
          title="New Client"
          isClosable={true}
        >
          <ClientForm
            client={clientDraft}
            onChange={setClientDraft}
            handleClose={() =>
              setModalStatus({ ...modalStatus, client: false })
            }
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
          title="New Project"
          isClosable={true}
        >
          <ProjectForm
            handleClose={() =>
              setModalStatus({ ...modalStatus, project: false })
            }
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
          title="New Time Entry"
          isClosable={true}
        >
          <TimeEntryForm
            handleClose={() =>
              setModalStatus({ ...modalStatus, time_entry: false })
            }
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
            <CurrentTimeEntry
              handleStart={() =>
                setModalStatus({ ...modalStatus, time_entry: true })
              }
            />
            <TasksWidget />
            <EventsWidget />
            <ProjectsWidget
              handleNew={() =>
                setModalStatus({ ...modalStatus, project: true })
              }
            />
          </main>
        </div>
      </>
      )
    </div>
  );
};

export default Home;
