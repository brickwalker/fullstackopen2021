import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [filterEntry, setFilterEntry] = useState("");

  const handleNameEntry = (event) => setNewName(event.target.value);
  const handlePhoneEntry = (event) => setNewPhone(event.target.value);
  const handleFilterEntry = (event) => setFilterEntry(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === name)) {
      alert(`${name} is already added to phonebook`);
    } else {
      const id = persons.length > 0 ? persons[persons.length - 1].id + 1 : 1;
      setPersons([...persons, { name, phone, id }]);
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterEntry={filterEntry} handleFilterEntry={handleFilterEntry} />
      <NewEntry
        name={name}
        handleNameEntry={handleNameEntry}
        phone={phone}
        handlePhoneEntry={handlePhoneEntry}
        handleSubmit={handleSubmit}
      />
      <DisplayEntry entries={persons} filterEntry={filterEntry} />
    </div>
  );
};

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

const DisplayEntry = ({ entries, filterEntry }) => {
  const filteredEntries = filterEntry
    ? entries.filter((entry) =>
        entry.name.toLowerCase().includes(filterEntry.toLowerCase())
      )
    : entries;
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <li key={entry.id}>
              {entry.name} {entry.phone}
            </li>
          ))
        ) : (
          <li>No entries to display</li>
        )}
      </ul>
    </div>
  );
};

export default App;
