import React from "react";
import propTypes from "prop-types";
import { Button } from "@mui/material";

const ToggleForm = (props) => {
  const hideWhenVisible = { display: props.visible ? "none" : "" };
  const showWhenVisible = { display: props.visible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={props.toggleVisibility}>
          {props.showButtonLabel}
        </Button>
      </div>
      <div className="toggleExpanded" style={showWhenVisible}>
        {props.children}
        <Button onClick={props.toggleVisibility}>
          {props.hideButtonLabel}
        </Button>
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
