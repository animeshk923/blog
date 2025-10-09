const { Router } = require("express");
const router = Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/signup", isNotLoggedIn, controller.signUpGet);
router.post("/signup", controller.validateUser, controller.signUpPost);
router.get("/login", isNotLoggedIn, controller.logInGet);
router.post(
  "/login",
  passport.authenticate(
    "local",
    {
      session: false,
      successRedirect: "/",
      failureRedirect: "/login",
      failureMessage: true,
    },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something went wrong. See errors for more details",
          user: user,
          error: err,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(
          user,
          "your_jwt_secret",
          { expiresIn: "1d" },
          (err, token) => {
            res.json({ token });
          }
        );
        return res.json({ user, token });
      });
    }
  )
);
router.get("/logout", isAuth, controller.logOutGet);

module.exports = router;
