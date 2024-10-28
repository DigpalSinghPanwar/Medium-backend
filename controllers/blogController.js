const Blog = require("../models/blogModel");

exports.postBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({
        status: "failed",
        message: "Provide details related to content",
      });
    }
    const blog = await Blog.create(req.body);
    const newBlog = await Blog.findById(blog._id).populate({
      path: "userId",
      select: "name about",
    });
    res.status(201).json({
      status: "Success",
      data: { newBlog },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Provide details related to content",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, userId, _id } = req.body;

    if (!title || !content || !userId || !_id) {
      return res.status(400).json({
        status: "failed",
        message: "Provide details related to content",
      });
    }
    const blog = await Blog.findByIdAndUpdate(
      { _id },
      { title, content },
      { new: true }
    ).populate({
      path: "userId",
      select: "name about",
    });
    res.status(201).json({
      status: "Success",
      data: { blog },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Provide details related to content",
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Provide details related to content",
      });
    }

    const blog = await Blog.findById({ _id: id }).populate({
      path: "userId",
      select: "name about",
    });

    res.status(200).json({
      status: "Success",
      data: { blog },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Provide details related to content",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "userId",
      select: "name about",
    });
    res.status(200).json({
      status: "Success",
      result: blogs.length,
      data: { blogs },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Provide details related to content",
    });
  }
};
