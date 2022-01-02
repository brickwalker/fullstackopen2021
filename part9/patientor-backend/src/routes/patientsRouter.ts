import express from "express";
import {
  filterPatients,
  addPatient,
  findPatient,
  addEntry,
} from "../services/patientsService";
import { Patient, PublicPatient, Entry } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;
  const entry = req.body as Omit<Entry, "id">;
  const addedEntry = addEntry(patientId, entry);
  if (addedEntry) {
    res.json(addedEntry);
  } else {
    res.json({ error: `Entry cannot be added: ${JSON.stringify(entry)}` });
  }
});

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
