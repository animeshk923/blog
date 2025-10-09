const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const alphaErr = "must only contain letters.";
const emailErr = "must be a valid email";
const passErr = "Password length should be at least 6 characters";
const confirmPassErr = "Passwords don't match. please re-enter";
const validateUser = [
  body("fullName").trim().isAlpha().withMessage(`First name ${alphaErr}`),
  body("email").trim().isEmail().withMessage(`${emailErr}`),
  body("password").trim().isLength({ min: 6 }).withMessage(passErr),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(confirmPassErr),
  body("adminPass")
    .trim()
    .isNumeric()
    .isLength({ min: 6 })
    .withMessage(`Admin password is wrong!`),
];

async function signUpGet(req, res) {}

async function signUpPost(req, res, next) {
  // validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }

  const { fullName, email, password } = req.body;

  try {
    // handle case where user is already registered so redirect them to login page
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        fullName: fullName,
        password: hashedPassword,
      },
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function logInGet(req, res) {
  const errorMessage = req.session.messages;
  res.render("login", { messages: errorMessage });
}

async function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function handleNonExistentRoutes(req, res) {
  res.status(404).json({ message: "404 NOT FOUND!" });
}

module.exports = { validateUser, signUpPost, logInGet, logOutGet, handleNonExistentRoutes };
