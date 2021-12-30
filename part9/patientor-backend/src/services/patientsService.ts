import patientsData from "../../data/patients.json";
import { Patient } from "../types/types";
import { v1 as uuidv1 } from "uuid";
import { Gender } from "../types/types";

const patients: Patient[] = patientsData.map((p) => ({
  ...p,
  gender: p.gender as Gender,
}));

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
  if (!validatePatientData(patientObject))
    throw new Error(
      "Patient data validation not passed. Entry cannot be created."
    );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuidv1();
  const newPatient = { ...patientObject, id };
  patients.push(newPatient);
  // Using destructuring to remove property
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...patientNoSsn } = newPatient;
  return patientNoSsn;
};

const validatePatientData = (patientObject: Omit<Patient, "id">): boolean => {
  if (
    !hasAllProperties(patientObject, [
      "name",
      "dateOfBirth",
      "ssn",
      "gender",
      "occupation",
    ])
  )
    return false;
  if (!isString(patientObject.name)) return false;
  if (!isString(patientObject.ssn)) return false;
  if (!isString(patientObject.dateOfBirth)) return false;
  if (!isString(patientObject.occupation)) return false;
  if (!isDateString(patientObject.dateOfBirth)) return false;
  if (!isGender(patientObject.gender)) return false;

  return true;
};

const hasAllProperties = (
  object: object,
  properties: string[]
): object is Omit<Patient, "id"> => {
  const presentProperties = Object.keys(object);
  let result = true;
  properties.forEach((p) => {
    if (!presentProperties.includes(p)) {
      result = false;
    }
  });
  return result;
};

const isString = (property: unknown): property is string => {
  return typeof property === "string" || property instanceof String;
};

const isDateString = (property: string): boolean => {
  return Boolean(Date.parse(property));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (property: any): property is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(property);
};
