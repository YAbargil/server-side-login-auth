import router from "./router.js";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import { login, signup } from "./user.js";
import { middlewareProtect } from "./auth.js";
import { errorHandler, isUser } from "./errorhandler.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Homepage " });
  res.end();
});

app.post("/login", isUser, login);

// app.put("/login", async (req, res) => {
//   var status;
//   const json = await login({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   status = json.success ? 200 : 401;
//   res.status(status);
//   res.json(json);
//   res.end();
// });

app.post("/signup", errorHandler, signup);

// app.put("/signup", async (req, res) => {
//   const json = await signup({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   console.log("json returned", json);
//   res.json(json);
//   res.end();
// });
app.use("/api", middlewareProtect, router);

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Unknown path" });
  res.end();
});

export default app;
