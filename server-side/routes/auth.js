import express from 'express';
const router=express.Router();
import { register, login, googleLogin, getMe } from "../controller/auth.js";
import authMiddleware from "../middleware/auth.js";



router.post("/register", register);
router.post("/login", login);
router.post("/google/callback", googleLogin);
router.get("/me", authMiddleware, getMe);

export default router;
