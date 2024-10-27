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

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, userId, _id } = req.body;
    console.log(req.body);

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
    );
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
    console.log(id);

    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Provide details related to content",
      });
    }
    console.log("id received");

    const blog = await Blog.findById({ _id: id });
    console.log("Blog", blog);

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
    const blogs = await Blog.find();
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
