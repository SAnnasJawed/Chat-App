const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Message extends Model {}
Message.init(
  {
    chatId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "message",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Message;
