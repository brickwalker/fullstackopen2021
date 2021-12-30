import express from "express";
import {
  exerciseCalculator,
  parseExerciseArguments,
  CalcInput,
} from "../services/exerciseService";

const router = express.Router();

router.post("/", (req, res) => {
  const parsedArgs = parseExerciseArguments(req.body as CalcInput);
  const result = exerciseCalculator(
    parsedArgs.dailyLog,
    parsedArgs.dailyTarget
  );
  res.json(result);
});

export default router;
