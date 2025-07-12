import express from "express";
import {protectRoute }from "../middleware/auth.middleware";
import { sendMessage } from "../controller/message.controller";

const router = express.Router();

router.post("/send", protectRoute, sendMessage)
// router.get("/room:roomId", protectRoute, getMessage)