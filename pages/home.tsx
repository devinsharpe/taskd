import React, { useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import { Account } from "../types/models";
import AccountDetailsForm from "../components/account-details-form";
import ActionBar from "../components/action-bar";
import CurrentTimeEntry from "../components/current-time-entry";
import EventsWidget from "../components/events-widget";
import Modal from "../components/modal";
import type { NextPage } from "next";
import ProjectsWidget from "../components/projects-widget";
import TasksWidget from "../components/tasks-widget";
import { UilPlusCircle } from "@iconscout/react-unicons";
import { format } from "date-fns";
import { supabase } from "../utils/supabaseClient";
import useToggl from "../hooks/useToggl";

const Home: NextPage = () => {
  const { account, setAccount, user } = useUserStore((state) => ({
    account: state.account,
    setAccount: state.setAccount,
    user: state.user,
  }));
  const { authenticate, client } = useToggl();
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [showActionBar, setShowActionBar] = useState(true);
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { setTogglUser } = useTogglStore((state) => ({
    setTogglUser: state.setTogglUser,
  }));
  const [today, _] = useState(new Date());

  const test = async () => {
    console.log(await client.list());
    console.log(await client.get(56824654));
  };

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
      {account ? <ActionBar /> : <></>}
      {account ? (
        <>
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
