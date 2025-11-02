import express from "express";
import {
  // saveUser,
  // userLogin,
  getAllUsers,
  deleteUser,
  updateUser,
  getuserById
} from "../controller/user.js";
const router= express.Router();
// Create a new user
// router.post("/", saveUser);

//login user
// router.post("/login", userLogin);
// Get all users
router.get("/", getAllUsers);
// Delete a user
router.delete("/:id", deleteUser);

//update a user
router.patch("/:id", updateUser);
//getUserById
router.get("/:id",getuserById)

export default router;
