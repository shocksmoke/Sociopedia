import express from "express";
const router= express.Router();
import {getUser, getFriends,addRemoveFriend } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

router.use(verifyToken);

router.get("/:userId", getUser);

router.get("/friends/:userId",getFriends);

router.post("/addRemoveFriend", addRemoveFriend);

export default router;