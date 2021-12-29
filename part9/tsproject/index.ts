import express from "express";
import bmiRouter from "./controllers/bmiRouter";
import { unknownEndpoint, errorHandler } from "./utils/middleware";

const app = express();
const port = 3002;

app.use("/bmi", bmiRouter);

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
