import React from "react";

const Feedback = ({ feedback }) => {
  if (feedback) {
    const feedbackClass =
      feedback.includes("removed from server") ||
      feedback.includes("failed")
        ? "feedback failure"
        : "feedback success";
    return <div className={feedbackClass}>{feedback}</div>;
  } else {
    return null;
  }
};

export default Feedback;
