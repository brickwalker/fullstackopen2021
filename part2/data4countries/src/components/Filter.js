import React from "react";

const Filter = ({ text, onChange }) => {
  return (
    <div>
      <label>
        find countries <input value={text} onChange={onChange} />
      </label>
    </div>
  );
};

export default Filter;
