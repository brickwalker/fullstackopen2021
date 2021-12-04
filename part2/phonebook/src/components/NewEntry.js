import React from "react";

const NewEntry = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <fieldset>
        <legend>Add a new</legend>
        <label>
          name:{" "}
          <input value={props.name} onChange={props.handleNameEntry} required />
        </label>
        <br />
        <label>
          number:{" "}
          <input
            value={props.phone}
            onChange={props.handlePhoneEntry}
            required
          />
        </label>
        <br />
        <button type="submit">add</button>
      </fieldset>
    </form>
  );
};

export default NewEntry;
