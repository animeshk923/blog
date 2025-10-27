const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function createUser(name, email, password, isAdmin) {
  await prisma.user.create({
    data: {
      email: email,
      fullName: name,
      password: password,
      isAdmin: isAdmin,
    },
  });
}

async function queryGetAllBlogs() {
  return await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

async function getUser(email) {
  return await prisma.user.findUnique({ where: { email: email } });
}

async function storeBlog(title, content, publishStatus, userId) {
  await prisma.post.create({
    data: {
      title: title,
      body: content,
      isPublished: publishStatus,
      userId: userId,
      time: new Date(),
    },
  });
}
async function getBlogById(blogid) {
  return await prisma.post.findUnique({
    where: {
      id: parseInt(blogid),
    },
  });
}

async function updateBlogById(blogid, title, content, publishStatus) {
  await prisma.post.update({
    data: {
      title,
      body: content,
      isPublished: publishStatus,
    },
    where: {
      id: parseInt(blogid),
    },
  });
}

async function deleteBlogById(blogid) {
  await prisma.post.delete({
    where: {
      id: parseInt(blogid),
    },
  });
}

module.exports = {
  createUser,
  getUser,
  storeBlog,
  queryGetAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
