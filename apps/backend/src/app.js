require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { handleNonExistentRoutes } = require("./controllers/auth");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "hello from root!" });
});
app.use("/blog", routes.blog);
app.use("/auth", routes.auth);
app.get("/{*splat}", handleNonExistentRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));
