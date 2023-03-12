import express, { Request, Response, NextFunction } from "express";
import api from "./routes/api";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Top Page");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
