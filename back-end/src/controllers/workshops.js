const pool = require("../db/db");

const getAllWorkshops = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workshops");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllWorkshops };
