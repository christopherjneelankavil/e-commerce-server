const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    const emailUsed = await User.findOne({ email });

    if (emailUsed) {
      return res.status(400).json({ message: "Email is already in use" });
    } else {
      //return res.status(200).json({message:"Email is available"});
      let user = new User({ fullname, username, email, password });
      user = await user.save();
      res.json(user);
    }
  } catch (e) {
    console.log(e.toString());
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

module.exports = authRouter;
