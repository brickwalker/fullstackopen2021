import { State } from "./state";
import { Diagnosis, Patient, PatientEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_CURRENT_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: PatientEntry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload,
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      const patient = action.payload.currentPatient;
      const entry = action.payload.newEntry;
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry),
      };
      return {
        ...state,
        patients: { ...state.patients, [updatedPatient.id]: updatedPatient },
        currentPatient: { ...updatedPatient },
      };
    default:
      return state;
  }
};
