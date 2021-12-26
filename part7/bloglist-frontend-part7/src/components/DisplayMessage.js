import React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";

const DisplayMessage = ({ message }) => {
  return <Alert severity={message.type}>{message.text}</Alert>;
};

DisplayMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default DisplayMessage;
