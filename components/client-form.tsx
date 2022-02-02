import React from "react";

const ClientForm = () => {
  return (
    <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label
          htmlFor=""
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Name
        </label>
        <input className="w-full px-3 py-2 border rounded focus:outline-amber-400 dark:bg-white border-zinc-600" />
      </fieldset>
      <fieldset>
        <label
          htmlFor=""
          className="text-lg font-semibold text-zinc-800 dark:text-white"
        >
          Notes
        </label>
        <textarea className="w-full h-24 rounded focus:ring-amber-400 focus:border-amber-400"></textarea>
      </fieldset>
    </form>
  );
};

export default ClientForm;
