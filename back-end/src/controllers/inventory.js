const pool = require("../db/db");

const getAllMaterials = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM materials_inventory");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllMaterials };
