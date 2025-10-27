require("dotenv").config();
const sanitizeHtml = require("sanitize-html");
const {
  storeBlog,
  queryGetAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../prisma/queries");
// TODO: implement functionality
// get all blogs from the database

// replace the controller implementation
async function getAllBlogs(req, res) {
  try {
    const blogs = await queryGetAllBlogs();
    // console.log("Fetched blogs:", blogs);
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

// TODO: implement functionality
async function getDraftBlog(req, res) {
  // get draft blog from the database

  res.json({ msg: "edit draft blog?" });
}

// TODO: implement functionality
async function editBlog(req, res) {
  // get specific blog from the database
  const { blogid } = req.params;
  const { title, content, publishStatus } = req.body;

  // console.log("Editing blog id:", blogid);
  // console.log("New title:", title);
  // console.log("New content:", content);
  // console.log("New publish status:", publishStatus);

  await updateBlogById(
    blogid,
    sanitizeHtml(title),
    sanitizeHtml(content),
    publishStatus
  );
  res.status(200).json({ msg: "edit success!", authData: req.authData });
}

// TODO: use cloudinary in the second iteration to host images for the cover and any image inside the blog itself.

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

// TODO: implement functionality
async function convertToDraft(req, res) {
  // get specific blog from the database
  res.json({ msg: "publish new blog?" });
}

// TODO: implement functionality
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
  getDraftBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
  convertToDraft,
};
