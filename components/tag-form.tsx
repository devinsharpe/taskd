import { UilPlus } from "@iconscout/react-unicons";
import React, { FormEventHandler } from "react";
import { Tag } from "../types/toggl";
import Button from "./button";

interface TagFormProps {
  tag: Tag;
  isLoading: boolean;
  handleSubmit: FormEventHandler;
  onChange: (tag: Tag) => void;
}

const TagForm: React.FC<TagFormProps> = ({
  tag,
  isLoading,
  handleSubmit,
  onChange,
}) => {
  return (
    <form className="flex items-end w-full space-x-2" onSubmit={handleSubmit}>
      <fieldset className="w-full group">
        <label htmlFor="tag-name">Name</label>
        <input
          type="text"
          name="name"
          id="tag-name"
          className="w-full rounded"
          required
          value={tag.name}
          onChange={(e) => onChange({ ...tag, name: e.target.value })}
        />
      </fieldset>
      <span className="pb-[.125rem]">
        <Button variant="secondary" type="submit" isLoading={isLoading}>
          <UilPlus />
        </Button>
      </span>
    </form>
  );
};

export default TagForm;
