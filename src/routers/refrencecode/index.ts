import express, { Request, Response, Router } from "express";

export const referenceCodeRouter: Router = express.Router();

referenceCodeRouter.get("/code", async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});
