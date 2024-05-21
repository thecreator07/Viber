import express from "express";
import {CommentPost, getFeedPosts,getUserPosts,likePost} from "../controllers/Posts.js";
// import { verifyToken } from "../middleware/auth.js";


const router =express.Router();

/*READ*/
router.get("/",getFeedPosts);
router.get("/:userId/posts",getUserPosts);

/*UPDATE*/
router.patch("/:id/like",likePost);
router.patch("/:id/comment",CommentPost)

export default router;