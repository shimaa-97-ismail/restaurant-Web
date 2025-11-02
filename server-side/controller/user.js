import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../config/appError.js";

function generateToken(id,role) {
  var token = jwt.sign({ userID: id , role:role},  process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}


async function saveUser (req, res, next)  {
  try {
    const newUser = req.body;
    if (!newUser) {
      throw new AppError("User data is required", 400);
    }
    const savedUser = await userModel.create(newUser);
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
}

// async function userLogin (req, res, next)  {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       throw new AppError("email and password are required", 400);
//     }
//     const user = await userModel.findOne({ email }).select("+password");
//     console.log(user);
    
//     if (!user) {
//       throw new AppError("Invalid email or password", 401);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new AppError("Invalid email or password", 401);
//     }
//     const token = generateToken(user._id,user.role);
    

//     res
//       .status(200)
//       .json({
//         message: "Login successful",
//         userId: user._id,
//         role: user.role,
//         token,
//       });
//   } catch (err) {
//     next(err);
//   }
// }

// Get all users
async function getAllUsers (req, res, next) {
  try {
    const users = await userModel.find();
    console.log(users);
    
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

// Delete a user
async function deleteUser (req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const deletedUser = await userModel.findOne({ _id: id });
    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }
    await userModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

// Update a user
async function updateUser (req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const updatedUser = await userModel.findOne({ _id: id });
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }
    await userModel.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

async function getuserById(req,res,next){
  try{
 const {id}=req.params;
  console.log(req.params);
  
  const user=await userModel.findById(id);
  console.log(user);
  res.status(200).json({user:user})
  }catch(err){
next(err)
  }
 

}
export {
  // saveUser,
  // userLogin,
    getAllUsers,
    deleteUser,
    updateUser,
    getuserById
};