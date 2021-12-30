import express from "express";
import { filteredPatients, addPatient } from "../services/patientsService";
import { Patient } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(filteredPatients());
});

patientsRouter.post("/", (req, res) => {
  const patientData = req.body as Omit<Patient, "id">;
  let newPatient: Omit<Patient, "ssn">;
  try {
    newPatient = addPatient(patientData);
    res.json(newPatient);
  } catch (error) {
    let errorMessage = "Error happened. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
