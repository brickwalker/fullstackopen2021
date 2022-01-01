import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { apiBaseUrl } from "./constants";
import { setCurrentPatient, setDiagnoses, useStateValue } from "./state";
import { Diagnosis, Gender, Patient } from "./types";

const PatientPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then((response) => dispatch(setCurrentPatient(response.data)));
  }, []);

  useEffect(() => {
    void axios
      .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then((response) => dispatch(setDiagnoses(response.data)));
  }, []);

  const getIconName = (gender: Gender | undefined): SemanticICONS => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };

  return (
    <Container>
      <Header as="h2">
        {currentPatient?.name}{" "}
        <Icon name={getIconName(currentPatient?.gender)} />
      </Header>
      {currentPatient &&
        Object.keys(currentPatient).map(
          (key) =>
            key !== "entries" && (
              <p key={key}>
                <strong>{key}:</strong> {currentPatient[key as keyof Patient]}
              </p>
            )
        )}
      {currentPatient?.entries && currentPatient.entries.length > 0 && (
        <div>
          <Header as="h3">Entries:</Header>
          {currentPatient.entries.map((entry) => (
            <div key={entry.id}>
              <p>
                {entry.date} {entry.description}
              </p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((dianosisCode) => (
                    <li key={dianosisCode}>
                      {dianosisCode}{" "}
                      {diagnoses.find((diag) => diag.code === dianosisCode)?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default PatientPage;
