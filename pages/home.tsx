import React, { useEffect, useState } from "react";
import { useToastStore, useUserStore } from "../store";

import AccountDetailsForm from "../components/account-details-form";
import ActionBar from "../components/action-bar";
import Button from "../components/button";
import Modal from "../components/modal";
import type { NextPage } from "next";
import { UilInfo } from "@iconscout/react-unicons";

const Home: NextPage = () => {
  const { account, user } = useUserStore((state) => ({
    account: state.account,
    user: state.user,
  }));
  const [showActionBar, setShowActionBar] = useState(false);
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));

  const handleAccountFormSubmit = async (data: {
    lastName: string;
    firstName: string;
    togglToken: string;
  }) => {
    console.log(data);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowActionBar(true);
    }, 5000);
  }, []);

  return (
    <div>
      {showActionBar && <ActionBar />}
      {account || (
        <Modal
          title="User Details"
          isClosable={false}
          isOpen={true}
          onClose={() => console.log("close")}
        >
          <AccountDetailsForm user={user!} onSubmit={handleAccountFormSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
