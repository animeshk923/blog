const { Router } = require("express");
const router = Router();
const passport = require("passport");

const {
  signUpPost,
  logOutGet,
  logInPost,
  verifyUser,
  verifyToken,
} = require("../controllers/auth");

router.post("/signup", signUpPost);
router.post("/login", logInPost);
router.get("/me", verifyToken, verifyUser);
router.get(
  "/logout",
  // TODO: implement to check whether user is present to logout and what to do when user is not present
  logOutGet
);

module.exports = router;
