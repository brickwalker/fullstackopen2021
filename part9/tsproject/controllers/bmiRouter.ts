import express from "express";
import { parseBmiArgs, calculateBmi } from "../services/bmiService";

const router = express.Router();

interface BmiQuery {
  height: string;
  weight: string;
}

router.get("/", (req, res) => {
  const query = req.query;

  if (!("height" in query && "weight" in query)) {
    res.json({ error: "malformatted params" });
  } else {
    const checkedQuery = (query as unknown) as BmiQuery;
    const bmiArgs = parseBmiArgs([checkedQuery.height, checkedQuery.weight]);
    const bmi = calculateBmi(bmiArgs.height, bmiArgs.weight)
    res.json({...bmiArgs, bmi});
  }
});

export default router;
