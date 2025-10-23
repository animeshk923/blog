require("dotenv").config();

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

// TODO: implement functionality
async function createNewBlog(req, res) {
  // get specific blog from the database

  res.json({ msg: "publish new blog?" });
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
