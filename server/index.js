const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./database");
const User = require("./DatabaseModel/user.model");
const UserRoute = require("./Routes/user.route");
const Chat = require("./DatabaseModel/chat.model");
const ChatRoute = require("./Routes/chat.route");
const Message = require("./DatabaseModel/message.model");
const MessageRoute = require("./Routes/message.route");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

// App Routes
app.use("/api/user", UserRoute);
app.use("/api/chats", ChatRoute);
app.use("/api/messages", MessageRoute);

const port = process.env.PORT || 5000;

const initApp = async () => {
  console.log("Testing the database connection..");

  try {
    await db.authenticate();
    console.log("Connection has been established successfully");
    app.listen(port, () => {
      console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
      console.log(`🚀 App listening on the port ${port}`);
      console.log(`=================================`);
      console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
      console.log(`🚀 App listening on the port ${port}`);
      console.log(`=================================`);
      // User.sync({
      //   alter: true,
      // });
      // Chat.sync({
      //   alter: true,
      // });
      // Message.sync({
      //   alter: true,
      // });
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

initApp();
