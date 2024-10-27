const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
router.route("/").post(blogController.postBlog);

router.route("/update").put(blogController.updateBlog);

router.route("/bulk").get(blogController.getAllBlogs);

router.route("/:id").get(blogController.getBlog);

module.exports = router;
