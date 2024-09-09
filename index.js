const express = require("express");
const cors = require("cors");
const App = express();
const PORT = 3000;
const { ConnectWithDB } = require("./ConnectionDB/connectionDB.js");
const userRoutes = require("./Routes/userRoutes.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// DotEnv configuration
dotenv.config();

// Middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

// Use CORS middleware with specific origin
App.use(cors({
  origin: "http://127.0.0.1:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// DB Connection
ConnectWithDB(process.env.DATABASE_URL);

// Routes
App.use("/API/users", userRoutes);

// Serve static files
App.use(express.static(path.join(__dirname, 'public')));

// Endpoint
App.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

App.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
