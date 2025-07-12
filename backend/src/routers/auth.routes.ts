import express from "express";
import { login, logout, signup, updateProfile } from "../controller/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { sendMessage, getMessage } from "../controller/message.controller";
import { get } from "http";

const router = express.Router();

router.post("/login", login)

router.post("/signup", signup)

router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile);

router.post("/send", protectRoute, sendMessage)
router.get("/:id", protectRoute, getMessage)

export default router;