import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  currentPatient: Patient | null;
  diagnoses: Diagnosis[]
};

const initialState: State = {
  patients: {},
  currentPatient: null,
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const setCurrentPatient = (currentPatientFromApi: Patient): Action => {
  return { type: "SET_CURRENT_PATIENT", payload: currentPatientFromApi };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnoses };
};
