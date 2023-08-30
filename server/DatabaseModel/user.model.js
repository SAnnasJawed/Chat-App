const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 32] },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 32] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 200] },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [8, 1024] },
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;
