const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authRouter } = require("./routes/api/auth.router");
const router = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "Server Internal Error" });
});

module.exports = app;
