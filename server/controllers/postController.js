import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      const err = new Error("Title and content are required");
      err.status = 400;
      return next(err);
    }
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

// Get paginated posts for the logged-in user
export const getPosts = async (req, res, next) => {
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
    next(err);
  }
};

// Get single post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }
    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized to view this post");
      err.status = 403;
      return next(err);
    }
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let post = await Post.findById(req.params.id);

    if (!post) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized to update this post");
      err.status = 403;
      return next(err);
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      const err = new Error("You don't have permission to delete this post");
      err.status = 403;
      return next(err);
    }

    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
