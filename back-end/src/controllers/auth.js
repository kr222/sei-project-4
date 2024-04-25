const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.staus(400).json({ message: "Username already exists" });
    }
    // hash pw
    const hashedPw = await bcrypt.hash(password, 12);
    // generate uuid
    const userID = uuidv4();
    // insert into db
    const newUser = await pool.query(
      "INSERT INTO users (id,username,password_hash) VALUES ($1, $2, $3) RETURNING *",
      [userID, username, hashedPw]
    );
    // generate jwt token
    const token = jwt.sign(
      { userID: newUser.rows[0].id, username: newUser.rows[0].username },
      process.env.ACCESS_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      token,
      userID: newUser.rows[0].id,
      username: newUser.rows[0].username,
    });
  } catch (error) {
    console.error("error registering user", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { getAllUsers, register };
