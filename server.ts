import express, { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import api from "./routes/api";
import csrf from "./routes/csrf";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      res.header("X-Frame-Options", "DENY");
    },
  })
);

app.use("/api", api);
app.use("/csrf", csrf);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Top Page");
});

app.get("/csp", (req: Request, res: Response) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      "object-src 'none';" +
      "base-uri 'none';" +
      "require-trusted-types-for 'script';"
  );
  res.render("csp", { nonce: nonceValue });
});

app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("アカウント登録しました。");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
