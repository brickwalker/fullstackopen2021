import React from "react";

const App = () => {
  const course = "Half Stack application development";
  const contentData = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header courseName={course} />
      <Content data={contentData} />
      <Total data={contentData} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props) => {
  return props.data.map((el, index) => (
    <p key={index}>
      {el.part} {el.exercises}
    </p>
  ));
};

const Total = (props) => {
  const total = props.data.reduce((prev, cur) => prev + cur.exercises, 0);
  return <p>Number of exercises {total} </p>;
};

export default App;
