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

//Function to Add a user in JSON file
const adduser = (req, resp) => {
  const newUser = req.body;

  // Step 1: Read existing users
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return resp.status(500).json({ error: "Failed to read users file" });
    }

    let users = [];
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          users = parsedData;
        } else {
          console.warn(
            "Parsed data is not an array. Initializing as an empty array."
          );
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return resp.status(500).json({ error: "Failed to parse users file" });
      }
    }

    // Step 2: Append new user to list
    const d = users[0];
    const keys = Object.keys(d);
    const length = keys[keys.length - 1];
    d[parseInt(length) + 1] = newUser;

    // Step 3: Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeError) => {
      if (writeError) {
        console.error("Error writing file:", writeError);
        return resp.status(500).json({ error: "Failed to write users file" });
      }

      resp.send({ data: users });
    });
  });
};

//FUnction to Search user by key
const searchUser = (req, resp) => {
  const { key } = req.params;

  // Step 1: Read existing users
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return resp.status(500).json({ error: "Failed to read users file" });
    }

    let users = [];
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          users = parsedData;
        } else {
          console.warn(
            "Parsed data is not an array. Initializing as an empty array."
          );
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return resp.status(500).json({ error: "Failed to parse users file" });
      }
    }
    // Step 2:
    const datas = users[0];
    const result = datas[key];
    if (result) return resp.send(result);
    return resp.send("No record found");
  });
};

//Function to get all user's email
const getusersemail = (req, resp) => {
  // Step 1: Read existing users
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return resp.status(500).json({ error: "Failed to read users file" });
    }

    let users = [];
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          users = parsedData;
        } else {
          console.warn(
            "Parsed data is not an array. Initializing as an empty array."
          );
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return resp.status(500).json({ error: "Failed to parse users file" });
      }
    }
    // Step 2:
    const datas = users[0];

    const usersemail = Object.values(datas).map((item) => item.email);

    resp.send({ message: "User Emails", data: usersemail });
  });
};

module.exports = {
  usersHome,
  getUsers,
  adduser,
  searchUser,
  getusersemail,
};
