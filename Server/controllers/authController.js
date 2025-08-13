const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// For temporary OTP storage
const otpStore = {}; // key: email, value: { otp, userData, expires }

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

await transporter.sendMail({
  from: `"🌱 KhetBazaar" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🌾 Your KhetBazaar OTP is Here!",
  html: `
    <div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: linear-gradient(to bottom, #e6fffa, #f0fff4); 
      padding: 30px; 
      border-radius: 15px; 
      text-align: center; 
      color: #2f855a;
    ">
      <h1 style="font-size: 28px; margin-bottom: 10px;">🌱 Welcome to KhetBazaar!</h1>
      <p style="font-size: 16px; color: #276749;">Hi User,</p>
      <p style="font-size: 16px; margin: 10px 0;">
        Thanks for joining our community. Use the OTP below to complete your registration:
      </p>
      <div style="
        display: inline-block;
        background: #38a169; 
        color: #ffffff; 
        font-size: 32px; 
        font-weight: bold; 
        padding: 15px 30px; 
        border-radius: 12px;
        letter-spacing: 3px;
        margin: 20px 0;
      ">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #2f855a; margin: 10px 0;">
        This OTP is valid for 5 minutes.
      </p>
      <hr style="border: none; border-top: 1px solid #c6f6d5; margin: 25px 0;">
      <p style="font-size: 12px; color: #4a5568;">
        If you did not request this, please ignore this email.  
        Happy Farming! 🌾
      </p>
    </div>
  `,
});
};

const registerUser = async (req, res) => {
  try {
    const { name, mobile, aadhaar, pan, address, email, password, role } = req.body;
    if (!name || !mobile || !aadhaar || !pan || !address || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    otpStore[email] = {
      otp,
      userData: { name, mobile, aadhaar, pan, address, email, password, role },
      expires: Date.now() + 5 * 60 * 1000, // 5 mins
    };

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "No OTP found, please register again" });
    if (record.expires < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashed = await bcrypt.hash(record.userData.password, 10);
    const user = await User.create({ ...record.userData, password: hashed });

    delete otpStore[email]; // remove OTP after use

    res.status(201).json({
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, verifyOtp, loginUser };
