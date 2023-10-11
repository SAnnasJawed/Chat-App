const User = require("../DatabaseModel/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  const jwt_key = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwt_key, { expiresIn: "3d" });
};

// Register User

const registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json({
        message: "All fields are required....",
      });
    } else {
      if (validator.isEmail(email)) {
        if (validator.isStrongPassword(password)) {
          let user = await User.findOne({
            where: {
              email: req.body.email,
            },
          });
          if (!user) {
            user = new User({ first_name, last_name, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            user.save();
            const token = createToken(user._id);
            return res.status(201).json({
              data: { _id: user._id, first_name, last_name, email, token },
            });
          } else {
            return res.status(400).json({
              message:
                "User with the provided email already exists please use a unique email....",
            });
          }
        } else {
          return res.status(400).json({
            message: "Password must be a strong password....",
          });
        }
      } else {
        return res.status(400).json({
          message: "Email must be a valid email....",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: `Some Error Occured: ${error}`,
    });
  }
};

// Login

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Email or Password.....!!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid Email or Password.....!!" });
    } else {
      const token = await createToken(user._id);
      return res.status(200).json({
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          token,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Some Error Occured: ${error}`,
    });
  }
};

// Find User by ID

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      return res.status(200).json({
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    } else {
      return res.status(404).json({
        message: `User Not Found for the provided ID: ${userId}`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Some Error Occured: ${error}`,
    });
  }
};

// Find All Users

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (users.length >= 1) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({
        message: "Users not Found...!!",
        data: users,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Some Error Occured: ${error}`,
    });
  }
};

module.exports = { registerUser, signIn, getUserById, getUsers };
