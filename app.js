const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 4000;
app.listen(PORT);

app.get("/", (req, resp) => {
  resp.send("Hello! This is Homepage.");
});
