import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import User from "./../models/User.model.js"
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

// create user
export const signup = async (req, res, next) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    const newUser = new User({...req.body, password: hash});

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (error) {
    next(error)
  }
}

// sign in user
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcryptjs.compare(req.body.password, user.password);
    if(!isCorrect) return next(createError(400, "Invalid credentials!"));

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    const {password, ...others} = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error)
  }
}

// google authentication