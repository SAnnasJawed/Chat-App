const {
  createChat,
  findUserChats,
  findChat,
} = require("../Controller/chat.controller");
const express = require("express");
const router = express.Router();

// Create Chat Route

router.post("/createchat", createChat);

// find User Chats Route

router.get("/finduserchat/:userId", findUserChats);

// find Chat Route
router.get("/findchat/:firstId/:secondId", findChat);

module.exports = router;
