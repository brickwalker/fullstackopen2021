import * as React from "react";

interface TotalProps {
  exerciseNumber: number;
}

const Total = ({ exerciseNumber }: TotalProps) => {
  return (
    <p>
      <strong>Number of exercises:</strong> {exerciseNumber}
    </p>
  );
};

export default Total;