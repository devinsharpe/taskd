import React, { useEffect, useState } from "react";

import ActionBar from "../components/action-bar";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [showActionBar, setShowActionBar] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowActionBar(true);
    }, 5000);
  }, []);
  return <div>{showActionBar && <ActionBar />}</div>;
};

export default Home;
