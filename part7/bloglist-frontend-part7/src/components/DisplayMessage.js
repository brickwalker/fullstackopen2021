import React from "react";
import PropTypes from "prop-types";

const DisplayMessage = ({ message }) => {
  return <div className={message.type}>{message.text}</div>;
};

DisplayMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default DisplayMessage;
