import * as React from "react";
import { CoursePart } from "./types";

const Part = (props: CoursePart) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled union member ${JSON.stringify(value)}`);
  };

  switch (props.type) {
    case "normal":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}
        </p>
      );

    case "groupProject":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.groupProjectCount}
        </p>
      );

    case "submission":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}{" "}
          {props.exerciseSubmissionLink}
        </p>
      );

    case "special":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}{" "}
          {props.requirements.join()}
        </p>
      );

    default:
      return assertNever(props);
  }
};

export default Part;
