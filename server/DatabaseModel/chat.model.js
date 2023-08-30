const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Chat extends Model {}
Chat.init(
  {
    members: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("members").split(";");
      },
      set(val) {
        this.setDataValue("members", val.join(";"));
      },
    },
  },
  {
    sequelize,
    modelName: "chat",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Chat;
