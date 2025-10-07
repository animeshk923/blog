require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { localStrategyConfig } = require("./auth/strategy");
const appRoute = require("./routes");
const {
  deserializerFunction,
  serializerFunction,
} = require("./auth/serialization");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }, // 15 days
  })
);

app.use(passport.session());

passport.use(localStrategyConfig);

passport.serializeUser(serializerFunction);

passport.deserializeUser(deserializerFunction);

app.use("/", appRoute);

app.listen(3000, () => console.log("app listening on port 3000!"));
