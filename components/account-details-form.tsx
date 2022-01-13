import React, { FormEventHandler } from "react";

import Button from "./button";
import SimplePopover from "./simple-popover";
import { UilInfo } from "@iconscout/react-unicons";
import { User } from "@supabase/supabase-js";

interface AccountDetailsFormProps {
  user: User;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    togglToken: string;
  }) => void;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  user,
  onSubmit,
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries()) as {
      firstName: string;
      lastName: string;
      togglToken: string;
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset className="group">
        <label htmlFor="firstName" className="required">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Jane"
          aria-required
        />
      </fieldset>
      <fieldset className="group">
        <label htmlFor="lastName" className="required">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Doe"
          aria-required
        />
      </fieldset>
      <fieldset className="group" aria-disabled>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          disabled
          value={user ? user.email : ""}
        />
      </fieldset>
      <fieldset className="group">
        <div className="flex items-center space-x-2">
          <label htmlFor="togglToken" className="required">
            Toggl Token
          </label>
          <SimplePopover
            buttonNode={
              <button
                className="p-1 rounded-lg dark:text-white text-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-600 focus:ring-2 focus:outline-none focus:ring-zinc-300"
                onClick={() => console.log(user)}
              >
                <UilInfo />
              </button>
            }
          >
            <p>
              You can find this at{" "}
              <a
                href="https://toggl.com/track/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Toggl.com
              </a>{" "}
              &gt; Profile Settings &gt; API Token
            </p>
          </SimplePopover>
        </div>
        <input type="text" name="togglToken" id="togglToken" aria-required />
      </fieldset>
      <Button type="submit" variant="primary" className="w-full" scaleOnHover>
        Save
      </Button>
    </form>
  );
};

export default AccountDetailsForm;
