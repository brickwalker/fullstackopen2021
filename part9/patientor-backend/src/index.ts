import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter";

const app = express();
const port = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  res.json({ message: "Hey you" });
});

app.listen(port, () => console.log(`App running at http://localhost:${port}.`));
