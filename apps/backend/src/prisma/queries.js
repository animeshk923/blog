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
    },
  });
}
module.exports = { createUser, getUser, storeBlog };
