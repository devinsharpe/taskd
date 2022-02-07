import React from "react";

const ClientForm = () => {
  return (
    <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label
          htmlFor="client-name"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Name
        </label>
        <input
          placeholder="Local Business"
          name="name"
          id="client-name"
          type="text"
          className="w-full focus:ring-amber-400 focus:border-amber-400 "
        />
      </fieldset>
      <fieldset>
        <label
          htmlFor="client-notes"
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Notes
        </label>
        <textarea
          name="notes"
          id="client-notes"
          className="w-full focus:ring-amber-400 focus:border-amber-400 "
        ></textarea>
      </fieldset>
    </form>
  );
};

export default ClientForm;
