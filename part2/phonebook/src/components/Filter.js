import React from "react";

const Filter = ({ filterEntry, handleFilterEntry }) => {
  return (
    <form>
      <fieldset>
        <legend>Filter</legend>
        <label>
          by name: <input value={filterEntry} onChange={handleFilterEntry} />
        </label>
      </fieldset>
    </form>
  );
};

export default Filter;
