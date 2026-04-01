import express from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Create a new post
router.post("/", protect, createPost);

// Get paginated posts
router.get("/", protect, getPosts);

// Get single post by ID
router.get("/:id", protect, getPostById);

// Update post
router.put("/:id", protect, updatePost);

// Delete post
router.delete("/:id", protect, deletePost);

export default router;
