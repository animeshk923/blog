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

async function getDraftBlog(req, res) {
  // get draft blog from the database

  res.json({ msg: "edit draft blog?" });
}



async function editBlog(req, res) {
  // jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  //   }
  // });
  // get specific blog from the database
  res.json({ msg: "edit blog?", authData: req.authData });
}

async function createNewBlog(req, res) {
  // get specific blog from the database

  res.json({ msg: "publish new blog?" });
}

async function convertToDraft(req, res) {
  // get specific blog from the database
  res.json({ msg: "publish new blog?" });
}

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
