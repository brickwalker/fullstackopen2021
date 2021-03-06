import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import DisplayEntry from "./components/DisplayEntry";
import Feedback from "./components/Feedback";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterEntry, setFilterEntry] = useState("");
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    contactService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameEntry = (event) => setNewName(event.target.value);
  const handlePhoneEntry = (event) => setNumber(event.target.value);
  const handleFilterEntry = (event) => setFilterEntry(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === name)) {
      const confirmed = window.confirm(`${name} is already added to phonebook.
Replace the old number with a new one?`);
      if (confirmed) {
        const id = persons.find((person) => person.name === name)._id;
        contactService
          .updateEntry(id, { name, number })
          .then((data) => {
            setPersons([
              ...persons.filter((person) => person._id !== id),
              data,
            ]);
            setFeedback(`Updated ${name}`);
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            const errorText = error.response.data.error;
            if (errorText) {
              setFeedback(errorText);
            } else {
              setFeedback(
                `${name} has already been removed from server. Please refresh the page.`
              );
            }
          });
      }
    } else {
      contactService
        .createEntry({ name, number })
        .then((data) => {
          setPersons([...persons, data]);
          setFeedback(`Added ${name}`);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          const errorText = error.response.data.error;
          if (errorText) {
            setFeedback(errorText);
          }
        });
    }
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleDelete = (event) => {
    const id = event.target.id;
    const contact = event.target.previousSibling.wholeText;
    const confirmed = window.confirm(
      `Do you want to remove this entry?\n${contact}`
    );
    if (confirmed) {
      contactService.deleteEntry(id).then((response) => {
        if (response.status === 204) {
          setPersons(persons.filter((person) => person._id !== id));
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
        number={number}
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
