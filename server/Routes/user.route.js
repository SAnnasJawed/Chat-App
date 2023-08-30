const {
  registerUser,
  signIn,
  getUserById,
  getUsers,
} = require("../Controller/user.controller");
const express = require("express");
const router = express.Router();

// SignUp Route
router.post("/register", registerUser);
// SignIn Route
router.post("/signin", signIn);
// FindUser By ID
router.get("/getuser/:userId", getUserById);
// Find Users
router.get("/getusers", getUsers);
module.exports = router;
