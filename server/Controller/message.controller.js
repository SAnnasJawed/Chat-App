const Message = require("../DatabaseModel/message.model");

// Create Message or Send Messages
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    if ((chatId, senderId, text)) {
      const message = new Message({
        chatId,
        senderId,
        text,
      });
      const response = await message.save();
      return res.status(201).json({
        response,
      });
    } else {
      throw new Error("All Parameters are Required");
    }
  } catch (error) {
    return res.status(500).json({ message: `Some Error Occured: ${error}` });
  }
};

// Get Messages

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    if (chatId) {
      const messages = await Message.findAll({ chatId });
      return res.status(200).json(messages);
    } else {
      throw new Error("Invalid field value....");
    }
  } catch (error) {
    return res.status(500).json({ message: `Some Error Occured: ${error}` });
  }
};

module.exports = { createMessage, getMessages };
