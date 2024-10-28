const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");
// global middlewares

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("middleware succesful");
  next();
});

app.use("/api/v1/user", authRouter);

app.use("/api/v1/blog", blogRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "welcome to my medium app",
  });
});

module.exports = app;
