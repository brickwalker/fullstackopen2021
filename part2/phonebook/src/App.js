import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import DisplayEntry from "./components/DisplayEntry";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [filterEntry, setFilterEntry] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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

export default App;
