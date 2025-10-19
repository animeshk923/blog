const { Router } = require("express");
const router = Router();
const {
  getAllBlogs,
  getSingleBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
  getDraftBlog,
  convertToDraft,
} = require("../controllers/blog");
const { verifyToken, verifyJwt } = require("../controllers/auth");

// blog root function where if visited, user will get a unordered list of blogs sorted from most recent to least recent
router.get("/", getAllBlogs);
router.get("/:blogid", getSingleBlog);
router.put("/:blogid", verifyToken, verifyJwt, editBlog);
router.delete("/:blogid", verifyToken, deleteBlog);
router.get("/:blogid/draft", verifyToken, getDraftBlog);
router.post("/new/publish", verifyToken, createNewBlog);
router.post("/new/draft", verifyToken, convertToDraft);

module.exports = router;
