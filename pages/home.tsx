import React, { useEffect, useState } from "react";
import { useToastStore, useUserStore } from "../store";

import { Account } from "../models";
import AccountDetailsForm from "../components/account-details-form";
import ActionBar from "../components/action-bar";
import Button from "../components/button";
import Modal from "../components/modal";
import type { NextPage } from "next";
import { UilInfo } from "@iconscout/react-unicons";
import { supabase } from "../utils/supabaseClient";

const Home: NextPage = () => {
  const { account, setAccount, user } = useUserStore((state) => ({
    account: state.account,
    setAccount: state.setAccount,
    user: state.user,
  }));
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [showActionBar, setShowActionBar] = useState(true);
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));

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
      }
      setIsSavingAccount(true);
    }
  };

  return (
    <div>
      {account ? <ActionBar /> : <></>}
      {account ? (
        <></>
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
