import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameEntry = (event) => setNewName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName }]);
    }
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewEntry
        name={newName}
        handleNameEntry={handleNameEntry}
        handleSubmit={handleSubmit}
      />
      <DisplayEntry entries={persons} />
    </div>
  );
};

const NewEntry = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <fieldset>
        <legend>Add a new</legend>
        <label>
          name: <input value={props.name} onChange={props.handleNameEntry} />
        </label>
        <button type="submit">add</button>
      </fieldset>
    </form>
  );
};

const DisplayEntry = ({ entries }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.name}>{entry.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
