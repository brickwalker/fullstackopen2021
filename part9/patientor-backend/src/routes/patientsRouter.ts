import express from "express";
import { filteredPatients, addPatient } from "../services/patientsService";
import { Patient } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(filteredPatients());
});

patientsRouter.post("/", (req, res) => {
  const patientData = req.body as Omit<Patient, "id">;
  const newPatient = addPatient(patientData);
  res.json(newPatient);
});

export default patientsRouter;
