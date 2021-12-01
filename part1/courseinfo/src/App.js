import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props) => {
  const content = props.data.map((el, index) => (
    <Part key={index} part={el.part} exercises={el.exercises} />
  ));
  return content;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const total = props.data.reduce((prev, cur) => prev + cur.exercises, 0);
  return <p>Number of exercises {total} </p>;
};

export default App;
