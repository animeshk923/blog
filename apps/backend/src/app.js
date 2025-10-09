require("dotenv").config();

const express = require("express");
// const { localStrategyConfig } = require("./auth/passport");
const routes = require("./routes");
const { handleNonExistentRoutes } = require("./controllers/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use(passport.session());

// passport.use(localStrategyConfig);

app.get("/", (req, res) => {
  res.json({ msg: "hello from root!" });
});
app.use("/blogs", routes.blogs);
app.use("/auth", routes.auth);
app.get("/{*splat}", handleNonExistentRoutes);
app.listen(3000, () => console.log("app listening on port 3000!"));
