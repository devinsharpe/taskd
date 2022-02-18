import { UilTrashAlt } from "@iconscout/react-unicons";
import React from "react";
import { Tag } from "../types/toggl";

interface TagItemProps {
  tag: Tag;
  handleDelete: (tid: number) => void;
}

const TagItem: React.FC<TagItemProps> = ({ handleDelete, tag }) => {
  return (
    <li className="flex items-center justify-between w-full px-4 py-2 space-x-2 border rounded-lg dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700">
      <span className="text-lg font-semibold text-zinc-800 dark:text-white">
        {tag.name}
      </span>
      <button
        className="flex items-center justify-center p-2 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
        onClick={() => handleDelete(tag.id!)}
        type="button"
      >
        <UilTrashAlt />
      </button>
    </li>
  );
};

export default TagItem;
