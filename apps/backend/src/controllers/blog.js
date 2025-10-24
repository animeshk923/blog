require("dotenv").config();
const sanitizeHtml = require("sanitize-html");
const { storeBlog } = require("../prisma/queries");
// TODO: implement functionality
async function getAllBlogs(req, res) {
  // get all blogs from the database
  res.json({ msg: "allblogs hallo!" });
}

// TODO: implement functionality
async function getSingleBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "single blog" });
}

// TODO: implement functionality
async function getDraftBlog(req, res) {
  // get draft blog from the database

  res.json({ msg: "edit draft blog?" });
}

// TODO: implement functionality
async function editBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "edit blog?", authData: req.authData });
}

// TODO: use cloudinary in the second iteration to host images for the cover and any image inside the blog itself.

async function createNewBlog(req, res) {
  const { content, title, publishStatus, userId } = req.body;

  console.log("blog:", content);
  console.log("title:", title);
  console.log(publishStatus);
  console.log(userId);

  try {
    await storeBlog(
      sanitizeHtml(title),
      sanitizeHtml(content),
      publishStatus,
      userId
    );
    res.status(200).json({ msg: "new blog publish! check DB to verify" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ msg: "Error publishing blog. Check log for details" });
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
  res.json({ msg: "convert to draft blog?" });
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
