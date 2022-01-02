import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import AddEntryModal from "./AddEntryModal";
import { apiBaseUrl } from "./constants";
import PatientEntry from "./PatientEntry";
import { setCurrentPatient, setDiagnoses, useStateValue } from "./state";
import { Diagnosis, Gender, Patient } from "./types";

const PatientPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [{ currentPatient }, dispatch] = useStateValue();
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
      <Button onClick={() => setModalOpen(!modalOpen)}>Add New Entry</Button>
      <AddEntryModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="ui hidden section divider"></div>
      {currentPatient?.entries && currentPatient.entries.length > 0 && (
        <div>
          <Header as="h3">Entries:</Header>
          {currentPatient.entries.map((entry) => (
            <PatientEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default PatientPage;
