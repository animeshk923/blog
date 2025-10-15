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
  passport.authenticate("jwt", { session: false }),
  logOutGet
);

module.exports = router;
