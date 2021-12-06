import React from "react";

const DisplayEntry = ({ entries, filterEntry, handleDelete }) => {
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
              {entry.name} {entry.phone}{" "}
              <button id={entry.id} onClick={handleDelete}>
                delete
              </button>
            </li>
          ))
        ) : (
          <li>No entries to display</li>
        )}
      </ul>
    </div>
  );
};

export default DisplayEntry;
