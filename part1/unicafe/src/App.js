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
  const handleGood = () => onClick("good");
  const handleNeutral = () => onClick("neutral");
  const handleBad = () => onClick("bad");

  return (
    <div>
      <h1>give feedback</h1>
      <Button type="good" onClick={handleGood} />
      <Button type="neutral" onClick={handleNeutral} />
      <Button type="bad" onClick={handleBad} />
    </div>
  );
};

const Button = ({ type, onClick }) => {
  return <button onClick={onClick}>{type}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const averageScore =
    all === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / all;
  const positivePercent = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={averageScore} />
          <StatisticLine text="positive" value={`${positivePercent} %`} />
        </div>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

export default App;
