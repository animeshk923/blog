const { Router } = require("express");
const router = Router();
const { getAllBlogs, getSingleBlog } = require("../controllers/blogs");

// blog root function where if visited, user will get a unordered list of blogs sorted from most recent to least recent
router.get("/", getAllBlogs);
router.get("/:blogid", getSingleBlog);
router.get("/new");
router.put("/:blogid/edit");
router.post("/new/publish");
router.delete("/:blogid");

module.exports = router;
