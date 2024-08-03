const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(bodyParser.json());

// Route Imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
