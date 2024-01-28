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

// permison specific domain
// var whitelist = ["http://localhost:3000"];

// cors option. Nobody will see or get your api datas if search url on browser
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// cors midleware
// app.use(cors(corsOptions));
app.use(cors());

const port = process.env.PORT || 5000;
// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/categories", CategoryRouter);

// not permision spesific endpoints
// app.use("/api/auth",cors(corsOptions), AuthRouter);
// app.use("/api/blogs",cors(corsOptions), BlogRouter);
// app.use("/api/comments",cors(corsOptions), CommentRouter);
// app.use("/api/categories",cors(corsOptions), CategoryRouter);

const start = async () => {
  try {
    app.listen(port, console.log(`Server starting in ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
