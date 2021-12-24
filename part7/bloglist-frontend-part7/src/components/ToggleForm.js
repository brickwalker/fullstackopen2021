import React from "react";
import propTypes from "prop-types";

const ToggleForm = (props) => {
  const hideWhenVisible = { display: props.visible ? "none" : "" };
  const showWhenVisible = { display: props.visible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={props.toggleVisibility}>
          {props.showButtonLabel}
        </button>
      </div>
      <div className="toggleExpanded" style={showWhenVisible}>
        {props.children}
        <button onClick={props.toggleVisibility}>
          {props.hideButtonLabel}
        </button>
      </div>
    </div>
  );
};

ToggleForm.propTypes = {
  visible: propTypes.bool.isRequired,
  toggleVisibility: propTypes.func.isRequired,
  showButtonLabel: propTypes.string.isRequired,
  hideButtonLabel: propTypes.string.isRequired,
  children: propTypes.any.isRequired,
};

export default ToggleForm;
