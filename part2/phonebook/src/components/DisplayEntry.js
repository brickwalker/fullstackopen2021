import React from "react";

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

export default DisplayEntry;
