const Chat = require("../DatabaseModel/chat.model");
const { Sequelize, Op } = require("sequelize");

// Create Chat

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    if (firstId && secondId) {
      const chat = await Chat.findOne({
        where: {
          [Op.or]: [
            {
              members: {
                [Op.and]: [
                  { [Op.like]: `"${firstId}"` },
                  { [Op.like]: `"${secondId}"` },
                ],
              },
            },
            {
              members: {
                [Op.and]: [
                  { [Op.like]: `"${secondId}"` },
                  { [Op.like]: `"${firstId}"` },
                ],
              },
            },
          ],
        },
      });
      // console.log(chat?.members)
      console.log("CHAT:", chat);
      if (chat) {
        return res.status(200).json(chat);
      }
      const newChat = new Chat({
        members: [firstId, secondId],
      });
      // console.log("newCHaT: ", newChat);
      await newChat.save();
      return res.status(200).json(newChat);
    } else {
      throw new Error("Need both ids...");
    }
  } catch (error) {
    return res.status(500).json({ message: `Some Error Occured: ${error}` });
  }
};

// findUserChats

const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  let stat = false;

  try {
    if (userId) {
      const chats = await Chat.findAll({
        // where: {
        //   flag: { [Op.contains]: userId },
        // },
      });
      // if (chats.length >= 1) {
      //   let arr = [];
      //   for (let chat of chats) {
      //     arr.push({
      //       [Op.contains]: [userId],
      //     });
      //   }
      //   console.log("ARR: ",arr);
      //   const abc = await Chat.findAll({
      //     where: {
      //       members: {
      //         [Op.or]: arr,
      //       },
      //     },
      //   });
      //   console.log("ABC: ", abc);
      if (chats.length >= 1) {
        return res.status(200).json(chats);
      } else {
        return res.status(200).json([]); // Empty array if no chats found
      }
    } else {
      throw new Error("UserId cannot be null");
    }
  } catch (error) {
    return res.status(500).json({ message: `Some error occurred: ${error}` });
  }
};
// for (let chat of chats) {
//   if (chat.members.includes(userId)) {
//     stat = true;
//   } else {
//     stat = false;
//   }
//

// findChat

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({
      where: {
        [Op.and]: [
          {
            members: {
              [Op.like]: `${firstId}`,
            },
          },
          {
            members: {
              [Op.like]: `${secondId}`,
            },
          },
        ],
      },
    });
    if (chat) {
      return res.status(200).json(chat);
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Some Error Occured: ${error}` });
  }
};

module.exports = { createChat, findUserChats, findChat };
