import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import bcrypt from "bcrypt"


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Helper to create JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ Normal signup
export const register = async (req, res) => {
  const { name, email, password ,userName,role} = req.body;
  console.log("her",name);
  
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password,userName,role });
    const token = generateToken(user);

    res.json({ user, jwt: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Normal login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");;
     if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    // // ✅ 2. Check if user has password (for Google users, password might be null)
    // if (!user.password) {
    //   return res.status(400).json({ message: "This account was created with Google. Please login with Google." });
    // }
    console.log(user);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    console.log(token);
    
    res.json({ user, token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Google login
export const googleLogin = async (req, res) => {
  try {
    console.log("fron google login");
    
    const { access_token } = req.body;
console.log(access_token);

    // Verify access token using Google API
    const ticket = await client.getTokenInfo(access_token);
    const email = ticket.email;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        userName: email.split("@")[0],
        role: "customer",
         isGoogleUser: true,
      });
    }

   const token = generateToken(user);
console.log(token);

    res.json({ user, token: token });
  } catch (err) {
    res.status(400).json({ message: "Google login failed", error: err.message });
  }
};

// ✅ Get current user
export const getMe = async (req, res) => {
  res.json({ user: req.user });
};