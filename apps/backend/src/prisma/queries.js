const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function createUser(name, email, password) {
  await prisma.user.create({
    data: {
      email: email,
      fullName: name,
      password: password,
    },
  });
}

async function addFolder(folderName) {}

async function getUser(email) {
  return await prisma.user.findUnique({ where: { email: email } });
}
module.exports = { createUser, getUser };
