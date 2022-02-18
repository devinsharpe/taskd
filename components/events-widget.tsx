import React from "react";
import { UilPlus } from "@iconscout/react-unicons";

const EventsWidget = () => {
  return (
    <section className="box-border w-full mb-4 space-y-4 overflow-hidden md:mx-4 break-inside group">
      <div className="flex items-center justify-between p-4 pb-2 space-x-2">
        <h4 className="text-4xl font-bold transition-colors duration-500 text-zinc-800 dark:text-zinc-200 group-hover:text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-lime-600">
          Events.
        </h4>
        <button className="secondary">
          <UilPlus />
        </button>
      </div>
    </section>
  );
};

export default EventsWidget;
