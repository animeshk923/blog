require("dotenv").config();
const sanitizeHtml = require("sanitize-html");
const {
  storeBlog,
  queryGetAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  updateBlogStatus,
  queryAllPublishedBlogs,
} = require("../prisma/queries");

// get all blogs from the database
async function getAllBlogs(req, res) {
  try {
    const blogs = await queryGetAllBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}
// get all published blogs from the database
async function getAllPublishedBlogs(req, res) {
  try {
    const blogs = await queryAllPublishedBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getSingleBlog(req, res) {
  try {
    const blog = await getBlogById(req.params.blogid);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function editBlog(req, res) {
  const { blogid } = req.params;
  const { title, content, publishStatus } = req.body;

  await updateBlogById(
    blogid,
    sanitizeHtml(title),
    sanitizeHtml(content),
    publishStatus
  );
  res.status(200).json({ msg: "edit success!", authData: req.authData });
}

// TODO: use cloudflare R2 in the second iteration to host images for the cover and any image inside the blog itself.

async function createNewBlog(req, res) {
  const { title, content, publishStatus, userId } = req.body;

  try {
    await storeBlog(
      sanitizeHtml(title),
      sanitizeHtml(content),
      publishStatus,
      userId
    );
    res.status(201).json({ msg: "New blog added! check DB to verify" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error adding blog. Check log for details" });
  }
}

async function toggleBlogStatus(req, res) {
  // get specific blog from the database
  const { blogid } = req.params;
  const { publishStatus } = req.body;
  try {
    await updateBlogStatus(blogid, publishStatus);
    res.json({ msg: `blog ${publishStatus ? "published" : "unpublished"}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error while toggling blog status. Check server log for details",
    });
  }
}

async function deleteBlog(req, res) {
  // get specific blog from the database
  try {
    const { blogid } = req.params;
    console.log("Deleting blog with id:", blogid);
    await deleteBlogById(blogid);
    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server error while deleting blog. Check log for details.",
    });
  }
}

module.exports = {
  getAllBlogs,
  getSingleBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
  toggleBlogStatus,
  getAllPublishedBlogs,
};
