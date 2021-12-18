import React from "react";

const ToggleForm = (props) => {

  const hideWhenVisible = { display: props.visible ? "none" : "" };
  const showWhenVisible = { display: props.visible ? "" : "none" };

 

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={props.toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={props.toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default ToggleForm;
