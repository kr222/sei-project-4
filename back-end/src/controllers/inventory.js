const pool = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const getAllMaterials = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM materials_inventory");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const addNewMaterial = async (req, res) => {
  const { material_type, material_name, material_quantity } = req.body;
  try {
    const materialID = uuidv4();
    const result = await pool.query(
      "INSERT INTO materials_inventory (id, material_type, material_name, material_quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [materialID, material_type, material_name, material_quantity]
    );
    res.json(result.rows);
    console.log(`Material successfully added`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllMaterials, addNewMaterial };
