const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

const auth = require("./middlewares/auth.js");

const app = express();

// Middlewares

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log("Server listening on port " + PORT);
});
