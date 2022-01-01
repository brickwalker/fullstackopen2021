import * as React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import {
  Entry,
  HealthCheckRating,
  HealthCheck,
  OccupationalHealthcare,
  Hospital,
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const setHealthColor = (healthRating: HealthCheckRating): SemanticCOLORS => {
  switch (healthRating) {
    case HealthCheckRating.CriticalRisk:
      return "red";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.Healthy:
      return "green";
    default:
      return "grey";
  }
};

const HealthCheckEntry = ({ entry }: { entry: HealthCheck }) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="leaf" />
      </Header>
      <p>{entry.description}</p>
      <Icon
        name="heart"
        size="small"
        color={setHealthColor(entry.healthCheckRating)}
      />
    </Segment>
  );
};

const HealthCareEntry = ({ entry }: { entry: OccupationalHealthcare }) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="doctor" /> {entry.employerName}
      </Header>
      <p>{entry.description}</p>
    </Segment>
  );
};

const HospitalEntry = ({ entry }: { entry: Hospital }) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="hospital" />
      </Header>
      <p>{entry.description}</p>
    </Segment>
  );
};

const PatientEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <HealthCareEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
