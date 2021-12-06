import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import DisplayEntry from "./components/DisplayEntry";
import Feedback from "./components/Feedback";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [filterEntry, setFilterEntry] = useState("");
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    contactService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameEntry = (event) => setNewName(event.target.value);
  const handlePhoneEntry = (event) => setNewPhone(event.target.value);
  const handleFilterEntry = (event) => setFilterEntry(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === name)) {
      const confirmed = window.confirm(`${name} is already added to phonebook.
Replace the old number with a new one?`);
      if (confirmed) {
        const id = persons.find((person) => person.name === name).id;
        contactService
          .updateEntry(id, { name, phone })
          .then((data) => {
            setPersons([...persons.filter((person) => person.id !== id), data]);
            setFeedback(`Updated ${name}`);
          })
          .catch(() => {
            setFeedback(
              `${name} has already been removed from server. Please refresh the page.`
            );
          });
      }
    } else {
      contactService.createEntry({ name, phone }).then((data) => {
        setPersons([...persons, data]);
        setFeedback(`Added ${name}`);
      });
    }
    setTimeout(() => setFeedback(null), 5000);
    setNewName("");
    setNewPhone("");
  };

  const handleDelete = (event) => {
    const id = event.target.id;
    const contact = event.target.previousSibling.wholeText;
    const confirmed = window.confirm(
      `Do you want to remove this entry?\n${contact}`
    );
    if (confirmed) {
      contactService.deleteEntry(id).then((response) => {
        if (response.statusText === "OK") {
          setPersons(persons.filter((person) => person.id !== parseInt(id)));
          setFeedback(`Deleted ${contact}`);
          setTimeout(() => setFeedback(null), 5000);
        } else {
          alert(`Server cannot remove entry with ID ${id}`);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback feedback={feedback} />
      <Filter filterEntry={filterEntry} handleFilterEntry={handleFilterEntry} />
      <NewEntry
        name={name}
        handleNameEntry={handleNameEntry}
        phone={phone}
        handlePhoneEntry={handlePhoneEntry}
        handleSubmit={handleSubmit}
      />
      <DisplayEntry
        entries={persons}
        filterEntry={filterEntry}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
