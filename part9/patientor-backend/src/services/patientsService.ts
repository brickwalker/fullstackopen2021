import patientsData from "../../data/patients.json";
import { Patient } from "../types/types";

export const patients: Omit<Patient, "ssn">[] = patientsData.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);
