const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../prisma/generated/prisma");
const prisma = new PrismaClient();
const passportJWT = require("passport-jwt");
const passport = require("passport");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const customFields = { usernameField: "email", passwordField: "password" };
const verifyCallback = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return done(null, false, { message: "User doesn't exists." });
    }

    const storedPass = user.password;

    const match = await bcrypt.compare(password, storedPass);

    if (!match) {
      // passwords do not match!
      return done(null, false, {
        message: "Incorrect email or password, please try again",
      });
    }

    return done(null, user, { message: "Logged In Successfully!" });
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));

// const jwtOptions = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: "your_jwt_secret",
// };

// const jwtVerifyCallback = async function (jwtPayload, done) {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
//     if (!user) {
//       return done(null, false, { message: "User not found!" });
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// };

// passport.use(new JWTStrategy(jwtOptions, jwtVerifyCallback));
