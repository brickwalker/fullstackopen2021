import { Request, Response, NextFunction } from "express";

export const unknownEndpoint = (_req: Request, res: Response) =>
  res.status(404).send({ error: "unknown endpoint" });

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(400).json({ error: err.message });
  next(err);
};
