const {
  createMessage,
  getMessages,
} = require("../Controller/message.controller");
const express = require("express");
const router = express.Router();

// Create Messages Route...

router.post("/sendmessage", createMessage);

// find Messages Route....

router.get("/getmessages/:chatId", getMessages);

module.exports = router;
