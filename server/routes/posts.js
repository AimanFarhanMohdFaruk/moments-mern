import express from 'express'
import {getPosts, createPost, updatePost, deletePost, likePost} from "../controllers/posts.js"
import authenticate from "../middleware/auth.js"

const router = express.Router()

router.get("/",  getPosts)
router.post("/", authenticate, createPost)
router.patch("/:id", authenticate, updatePost)
router.delete("/:id", authenticate, deletePost)
router.patch("/:id/likePost", authenticate, likePost)

export default router;