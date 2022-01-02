import patientsData from "../../data/patientsWithEntries";
import {
  Entry,
  Patient,
  PublicPatient,
  OccupationalHealthcare,
  HealthCheck,
  HealthCheckRating,
  Hospital,
} from "../types/types";
import { v1 as uuidv1 } from "uuid";
import { Gender } from "../types/types";

const patients: Patient[] = patientsData.map((p) => ({ ...p }));

export const filterPatients = (): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));

export const findPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export const addPatient = (
  patientObject: Omit<Patient, "id">
): PublicPatient => {
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

export const addEntry = (
  patientId: string,
  entry: Omit<Entry, "id">
): Entry => {
  const patient = findPatient(patientId);
  if (!patient) {
    throw new Error("Patient not found. Entry cannot be created.");
  }

  if (!validateEntryData(entry))
    throw new Error(
      "Patient data validation not passed. Entry cannot be created."
    );

  const newEntry = { ...entry, id: uuidv1() } as Entry;
  patient.entries.push(newEntry);
  patients.map((p) => (p.id === patient.id ? patient : p));
  return newEntry;
};

const validateEntryData = (entry: Omit<Entry, "id">): boolean => {
  if (!isString(entry.description)) return false;
  if (!isString(entry.date)) return false;
  if (!isDateString(entry.date)) return false;
  if (!isString(entry.specialist)) return false;
  if (!isString(entry.type)) return false;

  switch (entry.type) {
    case "OccupationalHealthcare":
      if (!("employerName" in (entry as Omit<OccupationalHealthcare, "id">)))
        return false;
      if (!isString((entry as Omit<OccupationalHealthcare, "id">).employerName))
        return false;
      break;

    case "HealthCheck":
      if (!("healthCheckRating" in (entry as Omit<HealthCheck, "id">)))
        return false;
      if (
        !Object.values(HealthCheckRating).includes(
          (entry as Omit<HealthCheck, "id">).healthCheckRating
        )
      )
        return false;
      break;

    case "Hospital":
      if (!("discharge" in (entry as Omit<Hospital, "id">))) return false;
      if (typeof (entry as Omit<Hospital, "id">).discharge !== "object")
        return false;
      if (!("date" in (entry as Omit<Hospital, "id">).discharge)) return false;
      if (!("criteria" in (entry as Omit<Hospital, "id">).discharge))
        return false;
      if (!isString((entry as Omit<Hospital, "id">).discharge.date))
        return false;
      if (!isDateString((entry as Omit<Hospital, "id">).discharge.date))
        return false;
      if (!isString((entry as Omit<Hospital, "id">).discharge.criteria))
        return false;
      break;

    default:
      return false;
  }

  return true;
};
