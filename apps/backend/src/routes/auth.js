const { Router } = require("express");
const router = Router();
const passport = require("passport");

const {
  signUpGet,
  signUpPost,
  logInGet,
  logOutGet,
  logInPost,
} = require("../controllers/auth");

// router.get("/signup", signUpGet);
router.post("/signup", signUpPost);
// router.get("/login", logInGet);
router.post("/login", logInPost);
router.get(
  "/logout",
  // TODO: implement to check whether user is present to logout and what to do when user is not present
  logOutGet
);

module.exports = router;
