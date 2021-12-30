import express from "express";
import { patients } from "../services/patientsService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patients);
});

export default patientsRouter;
