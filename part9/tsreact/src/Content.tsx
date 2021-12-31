import * as React from "react";
import { CoursePart } from "./types";
import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => <Part {...part} />)}
    </div>
  );
};

export default Content;
