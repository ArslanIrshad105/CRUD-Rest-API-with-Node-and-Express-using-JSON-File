const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

//All routes in here are starting with users
router.get("/", usersController.usersHome);

//Endpoint to Get a list of users
router.get("/getUsers", usersController.getUsers);

//Endpoint to Add a user
router.post("/adduser", usersController.adduser);

//Endpoint to Search user by key
router.get("/search/:key", usersController.searchUser);

module.exports = router;
