import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { apiBaseUrl } from "./constants";
import { setCurrentPatient, useStateValue } from "./state";
import { Gender, Patient } from "./types";

const PatientPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then((response) => dispatch(setCurrentPatient(response.data)));
  }, [dispatch]);

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
        Object.keys(currentPatient).map((key) => (
          <p key={key}>
            <strong>{key}:</strong> {currentPatient[key as keyof Patient]}
          </p>
        ))}
    </Container>
  );
};

export default PatientPage;
