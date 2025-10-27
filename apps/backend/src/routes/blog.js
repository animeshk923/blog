const { Router } = require("express");
const router = Router();
const {
  getAllBlogs,
  getSingleBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
  toggleBlogStatus,
  getAllPublishedBlogs,
} = require("../controllers/blog");
const { verifyToken } = require("../controllers/auth");

// blog root function where if visited, user will get a unordered list of blogs sorted from most recent to least recent
router.get("/", verifyToken, getAllBlogs);
router.get("/published", getAllPublishedBlogs);
router.get("/:blogid", getSingleBlog);
router.put("/:blogid", verifyToken, editBlog);
router.delete("/:blogid", verifyToken, deleteBlog);
// router.get("/:blogid/draft", verifyToken,);
router.put("/:blogid/toggle", verifyToken, toggleBlogStatus);
router.post("/new", verifyToken, createNewBlog);

module.exports = router;
