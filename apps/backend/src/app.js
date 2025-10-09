require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { localStrategyConfig } = require("./auth/strategy");
const routes = require("./routes");
const {
  deserializerFunction,
  serializerFunction,
} = require("./auth/serialization");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { handleNonExistentRoutes } = require("./controllers/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new PrismaSessionStore(new PrismaClient(), {
//       checkPeriod: 2 * 60 * 1000, //ms
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }),
//     cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }, // 15 days
//   })
// );

app.use(passport.session());

passport.use(localStrategyConfig);

passport.serializeUser(serializerFunction);

passport.deserializeUser(deserializerFunction);

app.get("/");
app.use("/blogs", routes.blogs);
app.use("/auth", routes.auth);
app.get("/{*splat}", handleNonExistentRoutes);
app.listen(3000, () => console.log("app listening on port 3000!"));
