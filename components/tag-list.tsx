import React from "react";
import TagItem from "./tag-item";
import { useTogglStore } from "../store";

interface TagListProps {
  handleDelete: (tid: number) => void;
}

const TagList: React.FC<TagListProps> = ({ handleDelete }) => {
  const { tags } = useTogglStore((state) => ({ tags: state.tags }));
  return (
    <ul className="w-full mt-2 space-y-2">
      {tags.map((tag) => (
        <TagItem tag={tag} key={tag.id} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default TagList;
