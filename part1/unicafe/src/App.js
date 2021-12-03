import React, { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementFeedback = (type) => {
    switch (type) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        console.error(`Wrong feedback type: ${type}.`);
        break;
    }
  };

  return (
    <div>
      <Feedback onClick={incrementFeedback} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Feedback = ({ onClick }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => onClick("good")}>good</button>
      <button onClick={() => onClick("neutral")}>neutral</button>
      <button onClick={() => onClick("bad")}>bad</button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
