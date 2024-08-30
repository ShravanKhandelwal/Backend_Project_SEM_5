const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Models/userSchema.js");
const { GenerateToken } = require("../Services/JwtService.js");

//! Register User Function
async function RegisterUser(req, res) {
  try {
    const { Name, Email, PhoneNumber, Password, Role } = req.body;

    if (!Name || !Email || !Password || !PhoneNumber || !Role) {
      return res.status(400).json({
        status: false,
        Error: "Enter All Details",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userObj = {
      Name,
      Email,
      PhoneNumber,
      Role,
      Password: hashedPassword,
    };
    await userModel.create(userObj);
    return res.status(200).json({
      status: true,
      Message: "Successfully registered Data Stored in DB",
      user: userObj,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
}

// ! Function For Login In The User
async function LoginUser(req, res) {
  try {
    const { Name, Email, Role, Password } = req.body;

    console.log(Name, Email, Role, Password);

    if (!Name || !Email || !Password || !Role) {
      return res.status(400).json({
        status: false,
        Error: "Enter All Details",
      });
    }

    // Find user From The DB
    const user = await userModel.findOne({
      Name: Name,
      Email: Email,
      Role: Role,
    });

    // Check Password with the Hashed Password
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (isMatch) {
      // Generating The JWT Token and storing it in the cookies
      const JWT_PAYLOAD = {
        Name: Name,
        Email: Email,
        Role: Role,
      };
      const JWT_TOKEN = await GenerateToken(JWT_PAYLOAD);

      res.cookie("JWT_TOKEN", JWT_TOKEN);
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
}

module.exports = {
  RegisterUser,
  LoginUser,
};
