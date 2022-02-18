import React from "react";
import { useTogglStore } from "../store";

const GroupedProjectOptions: React.FC = () => {
  const { clientGroups } = useTogglStore((state) => ({
    clientGroups: state.clientGroups.filter(
      (clientGroup) => clientGroup.projects.length
    ),
  }));

  return (
    <>
      <option value="-1">None</option>
      {clientGroups.map((clientGroup) => (
        <optgroup key={clientGroup.id} label={clientGroup.name}>
          {clientGroup.projects.map((project) => (
            <option value={project.id!} key={project.id!}>
              {project.name}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );
};

export default GroupedProjectOptions;
