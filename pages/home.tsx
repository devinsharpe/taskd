import React, { useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import { Account } from "../types/models";
import AccountDetailsForm from "../components/account-details-form";
import ActionBar, { Actions } from "../components/action-bar";
import CurrentTimeEntry from "../components/current-time-entry";
import EventsWidget from "../components/events-widget";
import Modal from "../components/modal";
import type { NextPage } from "next";
import ProjectsWidget from "../components/projects-widget";
import TasksWidget from "../components/tasks-widget";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";
import { format } from "date-fns";
import { supabase } from "../utils/supabaseClient";
import useToggl from "../hooks/useToggl";
import Button from "../components/button";
import TimeEntryForm from "../components/time-entry-form";
import ClientForm from "../components/client-form";
import ProjectForm from "../components/project-form";
import TaskForm from "../components/task-form";
import EventForm from "../components/event-form";

const Home: NextPage = () => {
  const { account, setAccount, user } = useUserStore((state) => ({
    account: state.account,
    setAccount: state.setAccount,
    user: state.user,
  }));
  const { authenticate } = useToggl();
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { projects, setTogglUser, tags } = useTogglStore((state) => ({
    projects: state.projects,
    setTogglUser: state.setTogglUser,
    tags: state.tags,
  }));
  const [today, _] = useState(new Date());

  const [modalStatus, setModalStatus] = useState({
    client: false,
    event: false,
    project: false,
    task: false,
    time_entry: false,
  });

  const handleAccountFormSubmit = async (formData: {
    lastName: string;
    firstName: string;
    togglToken: string;
  }) => {
    if (user) {
      setIsSavingAccount(true);
      const { data, error } = await supabase.from<Account>("accounts").insert({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: user!.email,
        togglToken: formData.togglToken,
        user: user!.id,
      });
      if (error) {
        pushToast({
          title: "Something went wrong",
          description: error.message,
          duration: 10000,
          isClosable: true,
          status: "ERROR",
        });
      } else {
        setAccount(data![0]);
        const togglUser = await authenticate(data![0].togglToken);
        setTogglUser(togglUser!);
      }
      setIsSavingAccount(true);
    }
  };

  return (
    <div>
      {account ? (
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
            className="border-amber-600 dark:bg-amber-700 dark:border-amber-700"
          >
            <ClientForm />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 secondary"
                onClick={() =>
                  setModalStatus({ ...modalStatus, client: false })
                }
              >
                <UilTimes />
                <span className="hidden md:inline">Close</span>
              </button>
              <Button scaleOnHover variant="primary" className="w-full">
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Add Client</span>
                </div>
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={modalStatus.event}
            onClose={() => setModalStatus({ ...modalStatus, event: false })}
            title="New Event"
            isClosable={true}
            className="border-teal-600 dark:bg-teal-700 dark:border-teal-700"
          >
            <EventForm />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 secondary"
                onClick={() => setModalStatus({ ...modalStatus, event: false })}
              >
                <UilTimes />
                <span className="hidden md:inline">Close</span>
              </button>
              <Button scaleOnHover variant="primary" className="w-full">
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Add event</span>
                </div>
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={modalStatus.project}
            onClose={() => setModalStatus({ ...modalStatus, project: false })}
            title="New Project"
            isClosable={true}
            className="dark:bg-emerald-700 border-emerald-600 dark:border-emerald-700"
          >
            <ProjectForm />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 secondary"
                onClick={() =>
                  setModalStatus({ ...modalStatus, project: false })
                }
              >
                <UilTimes />
                <span className="hidden md:inline">Close</span>
              </button>
              <Button scaleOnHover variant="primary" className="w-full">
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Add Project</span>
                </div>
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={modalStatus.task}
            onClose={() => setModalStatus({ ...modalStatus, task: false })}
            title="New Task"
            isClosable={true}
            className="border-blue-600 dark:bg-blue-700 dark:border-blue-700"
          >
            <TaskForm />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 secondary"
                onClick={() => setModalStatus({ ...modalStatus, task: false })}
              >
                <UilTimes />
                <span className="hidden md:inline">Close</span>
              </button>
              <Button scaleOnHover variant="primary" className="w-full">
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Add Task</span>
                </div>
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={modalStatus.time_entry}
            onClose={() =>
              setModalStatus({ ...modalStatus, time_entry: false })
            }
            title="New Time Entry"
            isClosable={true}
            className="dark:bg-violet-700 border-violet-600 dark:border-violet-700"
          >
            <TimeEntryForm />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 secondary"
                onClick={() =>
                  setModalStatus({ ...modalStatus, time_entry: false })
                }
              >
                <UilTimes />
                <span className="hidden md:inline">Close</span>
              </button>
              <Button scaleOnHover variant="primary" className="w-full">
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Add Time Entry</span>
                </div>
              </Button>
            </div>
          </Modal>
          <div className="container min-h-screen mx-auto">
            <header className="w-full px-4 py-8 space-y-4 md:px-8">
              <div>
                <h2 className="text-xl font-semibold opacity-50">
                  Hello {`${account.firstName} ${account.lastName}`}
                </h2>
                <h3 className="text-2xl font-bold tracking-wide">
                  {format(today, "LLLL d, yyyy")}
                </h3>
              </div>
            </header>
            <main className="box-border h-full px-2 pb-16 mx-auto md:masonry-2-col before:box-inherit after:box-inherit md:px-0">
              <CurrentTimeEntry />
              <TasksWidget />
              <EventsWidget />
              <ProjectsWidget />
            </main>
          </div>
        </>
      ) : (
        <Modal
          title="User Details"
          isClosable={false}
          isOpen={true}
          onClose={() => console.log("close")}
        >
          <AccountDetailsForm
            user={user!}
            onSubmit={handleAccountFormSubmit}
            isLoading={isSavingAccount}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
