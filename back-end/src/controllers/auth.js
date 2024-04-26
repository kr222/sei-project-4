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
  const { username, password, role } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // hash pw
    const hashedPw = await bcrypt.hash(password, 12);
    // generate uuid
    const userID = uuidv4();
    // insert into db
    const newUser = await pool.query(
      "INSERT INTO users (id,username,pw_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [userID, username, hashedPw, role]
    );
    // generate jwt token
    // const token = jwt.sign(
    //   { userID: newUser.rows[0].id, username: newUser.rows[0].username },
    //   process.env.ACCESS_SECRET,
    //   { expiresIn: "1h" }
    // );
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

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists in db
    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (user.rows.length === 0) {
      console.log(`username error`);
      return res.status(400).json({ message: "username/ password error" });
    }
    // check password against hash
    const validPassword = await bcrypt.compare(password, user.rows[0].pw_hash);
    if (!validPassword) {
      console.log(`password error`);
      return res.status(400).json({ message: "username/ password error" });
    }
    // claims and jwt
    const claims = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      role: user.rows[0].role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.log(`problem logging in`);
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      username: decoded.username,
      role: decoded.role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    console.log(`${claims.role}`);
    res.json({ access });
  } catch (error) {
    console.log(`refresh error`);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to refresh token" });
  }
};
module.exports = { getAllUsers, register, login, refresh };
