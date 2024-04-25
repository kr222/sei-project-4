require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./src/db/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// tables
const auth = require("./src/routers/auth");
const inventory = require("./src/routers/inventory");
const workshops = require("./src/routers/workshops");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/auth", auth);
app.use("/inventory", inventory);
app.use("/workshops", workshops);

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(5001, () => {
  console.log("DB Connected");
});
