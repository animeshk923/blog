require("dotenv").config();
const jwt = require("jsonwebtoken");

async function getAllBlogs(req, res) {
  // get all blogs from the database
  res.json({ msg: "allblogs hallo!" });
}

async function getSingleBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "single blog" });
}

async function postDraftBlog(req, res) {
  // get draft blog from the database
  // jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
  //   if (err) {
  //     res.status(400).json({ error: err });
  //   } else {
  //     res.json({ msg: "post new blog?", authData });
  //   }
  // });
  // res.json({ msg: "post new blog?" });
  res.sendStatus(200);
}

async function editBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "edit blog?" });
}

async function createNewBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "publish new blog?" });
}

async function deleteBlog(req, res) {
  // get specific blog from the database
  res.json({ msg: "delete blog?" });
}

module.exports = {
  getAllBlogs,
  getSingleBlog,

  postDraftBlog,
  editBlog,
  createNewBlog,
  deleteBlog,
};
