import { UilPlus } from "@iconscout/react-unicons";
import React from "react";

const TasksWidget = () => {
  return (
    <section className="box-border w-full mb-4 space-y-4 overflow-hidden md:mx-4 break-inside group">
      <div className="flex items-center justify-between p-4 pb-2 space-x-2">
        <h4 className="text-4xl font-bold transition-colors duration-300 group-hover:text-blue-600">
          Tasks.
        </h4>
        <button className="secondary">
          <UilPlus />
        </button>
      </div>
    </section>
  );
};

export default TasksWidget;
