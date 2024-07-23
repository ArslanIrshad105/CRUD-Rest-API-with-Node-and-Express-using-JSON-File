const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 4000;
app.listen(PORT);

const usersRoutes = require("./routes/users.js");

app.use("/users", usersRoutes);

app.get("/", (req, resp) => {
  resp.send("Hello! This is Homepage.");
});
