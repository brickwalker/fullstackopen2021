import patientsData from "../../data/patients.json";
import { Patient } from "../types/types";
import { v1 as uuidv1 } from "uuid";

const patients: Patient[] = [...patientsData];

export const filteredPatients = (): Omit<Patient, "ssn">[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export const addPatient = (
  patientObject: Omit<Patient, "id">
): Omit<Patient, "ssn"> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuidv1() as string;
  const newPatient = { ...patientObject, id };
  patients.push(newPatient);
  // Using destructuring to remove property
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...patientNoSsn } = newPatient;
  return patientNoSsn;
};
