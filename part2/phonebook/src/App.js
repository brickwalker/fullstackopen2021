import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: 11111 }]);
  const [name, setNewName] = useState("");
  const [phone, setNewPhone] = useState("");

  const handleNameEntry = (event) => setNewName(event.target.value);
  const handlePhoneEntry = (event) => setNewPhone(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === name)) {
      alert(`${name} is already added to phonebook`);
    } else {
      setPersons([...persons, { name, phone }]);
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewEntry
        name={name}
        handleNameEntry={handleNameEntry}
        phone={phone}
        handlePhoneEntry={handlePhoneEntry}
        handleSubmit={handleSubmit}
      />
      <DisplayEntry entries={persons} />
    </div>
  );
};

// const Filter = () => {
//   return (
//     <form>
//       <fieldset>
//         <legend>Add a new</legend>
//         <label>
//           name: <input value={props.name} onChange={props.handleNameEntry} />
//         </label>
//         <button type="submit">add</button>
//       </fieldset>
//     </form>
//   );
// }

const NewEntry = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <fieldset>
        <legend>Add a new</legend>
        <label>
          name:{" "}
          <input
            value={props.name}
            onChange={props.handleNameEntry}
            required
          />
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

const DisplayEntry = ({ entries }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.name}>{entry.name} {entry.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
