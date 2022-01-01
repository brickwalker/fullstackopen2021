import express from "express";
import {
  filterPatients,
  addPatient,
  findPatient,
} from "../services/patientsService";
import { Patient, PublicPatient } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = findPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.json({ error: `Patient with id ${id} not found.` });
  }
});

patientsRouter.get("/", (_req, res) => {
  res.json(filterPatients());
});

patientsRouter.post("/", (req, res) => {
  const patientData = req.body as Omit<Patient, "id">;
  let newPatient: PublicPatient;
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
