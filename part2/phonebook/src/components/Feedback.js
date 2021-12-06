import React from "react";

const Feedback = ({ feedback }) => {
  if (feedback) {
    return <div className="feedback">{feedback}</div>;
  } else {
    return null;
  }
};

export default Feedback;
