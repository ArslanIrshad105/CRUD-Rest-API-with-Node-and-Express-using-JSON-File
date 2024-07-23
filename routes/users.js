const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

//All routes in here are starting with users
router.get("/", usersController.usersHome);

//Endpoint to Get a list of users
router.get("/getUsers", usersController.getUsers);

module.exports = router;
