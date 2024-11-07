const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    const emailUsed = await User.findOne({ email });

    if (emailUsed) {
      return res.status(400).json({ message: "Email is already in use" });
    } else {
      //create a salt with cost factor 10
      const salt = await bcrypt.genSalt(10);

      //create a hashed password using the salt
      const hashedPassword = await bcrypt.hash(password, salt);

      //return res.status(200).json({message:"Email is available"});
      let user = new User({ fullname, username, email, password:hashedPassword });
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

authRouter.post("/api/signin", async(req,res)=>{
  try {
    const {email,password} = req.body;
    const findUser = await User.findOne({email});

    if(!findUser){
      res.status(400).json({message:"Invalid Credentials, no user with this email found"});
    }else{
      const isMatch = await bcrypt.compare(password, findUser.password);
      if(!isMatch){
        res.status(400).json({message:"Invalid credentials, password is incorrect"});
      }else{

      }
    }
  } catch (error) {
    
  }
});

module.exports = authRouter;
