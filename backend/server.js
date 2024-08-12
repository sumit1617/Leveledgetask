const app = require("./app");
const connectDatabase = require("./config/database");
const cors = require("cors");

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: __dirname + "/config/config.env" });
}

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections
process.on("Unhandled Rejections", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the Server due to Unhandled Promise Rejections`);

  server.close(() => {
    process.exit(1);
  });
});
