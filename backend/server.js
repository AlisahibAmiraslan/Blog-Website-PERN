require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./routes/auth");
const BlogRouter = require("./routes/blogs");
const CommentRouter = require("./routes/comments");
const CategoryRouter = require("./routes/category");

// middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/categories", CategoryRouter);

const start = async () => {
  try {
    app.listen(port, console.log(`Server starting in ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
