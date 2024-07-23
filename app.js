const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 4000;
app.listen(PORT);
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users.js");

app.use("/users", usersRoutes);

app.get("/", (req, resp) => {
  resp.send("Hello! This is Homepage.");
});
