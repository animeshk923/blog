require("dotenv").config();
require("../auth/passport");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { createUser, getUser } = require("../prisma/queries");
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

// async function signUpGet(req, res) {
//   res.json({ msg: "reached signup page" });
// }

async function signUpPost(req, res, next) {
  // validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }

  const { fullName, email, password, adminPass } = req.body;
  let isAdmin = false;

  try {
    // handle case where user is already registered so redirect them to login page
    const user = await getUser(email);

    if (adminPass === process.env.ADMIN_PASS) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    if (user) {
      res.status(400).json({ msg: "User already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await createUser(fullName, email, hashedPassword, isAdmin);

      res.status(200).json({ msg: "Sign up success!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
    // next(error);
  }
}

// async function logInGet(req, res) {
//   const errorMessage = req.session.messages;
//   res.render("login", { messages: errorMessage });
// }

async function logInPost(req, res, next) {
  passport.authenticate(
    "local",
    {
      session: false,
    },
    async (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Something went wrong. See errors for more details",
          user: user,
          error: err,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          console.error("req.login error:", err);
          res.json({ error: err });
          // return next(err);
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const payload = { id: user.id, email: user.email };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRES_IN };

        try {
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.error("JWT sign error:", err);
              return res.status(500).json({ msg: "Failed to create token" });
            }
            res.status(200).json({
              user: { id: user.id, name: user.name, email: user.email },
              token: token,
            });
          });
        } catch (err) {
          console.error("JWT sign error:", err);
          return res.status(500).json({ msg: "Failed to create token" });
        }
      });
    }
  )(req, res, next);
}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
async function verifyToken(req, res, next) {
  // Get auth header value
  console.log("enter verifYToken block");

  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    console.log(bearerToken);

    // Next middleware
    next();
  } else {
    // Forbidden
    console.log("403 verifyToken error");
    res.status(403).send({ message: "access denied" });
  }
}

function verifyJwt(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.authData = authData;
      next();
    }
  });
}

async function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
/**
 * Handle non existent routes
 * @param {Object} req
 * @param {Object} res
 */
async function handleNonExistentRoutes(req, res) {
  res.status(404).json({ message: "404 NOT FOUND!" });
}

module.exports = {
  validateUser,
  signUpPost,
  // logInGet,
  logInPost,
  verifyToken,
  verifyJwt,
  logOutGet,
  handleNonExistentRoutes,
  // signUpGet,
};
