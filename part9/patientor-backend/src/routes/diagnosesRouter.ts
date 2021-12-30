import express from "express";
import { diagnoses } from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.json(diagnoses);
});

export default diagnosesRouter;
