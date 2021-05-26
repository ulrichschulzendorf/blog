const express = require("express");
const router = express.Router();
const {
  getBlog,
  addBlog,
  deleteBlog,
  editBlog,
} = require("../controller/blogController");

router.route("/").get(getBlog).post(addBlog).put(editBlog).delete(deleteBlog);

module.exports = router;
