const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { username, email, pass, role } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ err });
      } else {
        const user = new UserModel({ username, email, pass: hash, role });
        await user.save();
        res.status(200).json({ msg: "A new user has been registered!" });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username },
            "masai"
          );
          res.status(200).json({ msg: "Login successfull!", token });
        } else {
          res.status(200).json({ msg: "Password does not match" });
        }
      });
    } else {
      res.status(200).json({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = {
  userRouter,
};
