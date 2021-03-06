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
    throw new Error(
      `Incorrect params: ${JSON.stringify(
        query
      )}. Correct syntax: /bmi?height=<hight in cm>&weight=<weight in kg>`
    );
  } else {
    const checkedQuery = query as unknown as BmiQuery;
    const bmiArgs = parseBmiArgs([checkedQuery.height, checkedQuery.weight]);
    const bmi = calculateBmi(bmiArgs.height, bmiArgs.weight);
    res.json({ ...bmiArgs, bmi });
  }
});

export default router;
