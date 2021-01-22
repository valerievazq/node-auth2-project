const express = require("express");
const usersRouter = require("./user-account/router");
const authRouter = require("./user-auth/router");
const protected = require("./middleware/restricted");
const server = express();
const dotenv = require("dotenv");
dotenv.config();

server.use(express.json());
server.use("/api/users", protected, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "api is running" });
});
module.exports = server;
