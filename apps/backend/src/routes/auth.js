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
router.get("/logout", logOutGet);

module.exports = router;
