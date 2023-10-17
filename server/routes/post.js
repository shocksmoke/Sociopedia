import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserPosts,getAllPosts, createPost, likePost, comment} from "../controllers/post.js";
const router= express.Router();

router.use(verifyToken);

router.get("/userPosts", getUserPosts);
router.get("/allPosts", getAllPosts);


router.post("/like", likePost);
router.post("/comment", comment);

export default router;