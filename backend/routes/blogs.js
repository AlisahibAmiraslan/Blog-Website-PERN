const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

router.route("/").post(createBlog).get(getAllBlogs);
router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
