const fs = require("fs");
const path = require("path");
const filePath = path.resolve("users.json");

//Function all routes in here are starting with users
const usersHome = (req, resp) => {
  resp.send("Users Main Route Point");
};

//Function to Get a list of users
const getUsers = (req, resp) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      resp.send(err);
    }
    // console.log({
    //   message: "getting data from json file",
    //   data: JSON.parse(data),
    // });
    resp.send(JSON.parse(data)); // you can also use res.send()
  });
};

module.exports = {
  usersHome,
  getUsers,
};
