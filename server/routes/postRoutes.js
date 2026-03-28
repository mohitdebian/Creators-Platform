import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Create a new post
router.post("/", protect, createPost);

// Get paginated posts
router.get("/", protect, getPosts);

export default router;
