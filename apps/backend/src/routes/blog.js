const { Router } = require("express");
const router = Router();
const {
  getAllBlogs,
  getSingleBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
} = require("../controllers/blog");
const { verifyToken } = require("../controllers/auth");

// blog root function where if visited, user will get a unordered list of blogs sorted from most recent to least recent
router.get("/", getAllBlogs);
router.get("/:blogid", getSingleBlog);
router.get("/new", getdraf);
router.put("/:blogid/edit", editBlog);
router.post("/new/publish", createNewBlog);
router.delete("/:blogid", deleteBlog);

module.exports = router;
