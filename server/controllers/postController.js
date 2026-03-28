import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get paginated posts for the logged-in user
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      Post.find({ author: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments({ author: req.user._id }),
    ]);
    res.json({
      success: true,
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
