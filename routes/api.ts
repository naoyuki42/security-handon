import express, { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.use(express.json());

const allowList = ["http://localhost:3000", "http://site.example:3000"];

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }

  next();
});

router.get("/", (req: Request, res: Response) => {
  let message = req.query.message;
  const lang = req.headers["x-lang"];

  if (message === "") {
    if (lang === "en") {
      message = "message is empty.";
    } else {
      message = "messageの値が空です。";
    }
  }

  res.setHeader("X-Timestamp", Date.now());
  res.send({ message });
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.end();
});

export default router;
