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

const editMaterial = async (req, res) => {
  const { id, material_type, material_name, material_quantity } = req.body;
  try {
    const result = await pool.query(
      "UPDATE materials_inventory SET material_type = $2, material_name = $3, material_quantity =$4 WHERE id=$1",
      [id, material_type, material_name, material_quantity]
    );
    res
      .status(200)
      .json({ status: "ok", msg: "material updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error, msg: "failed to update material" });
  }
};

const deleteMaterial = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM materials_inventory WHERE id=$1",
      [id]
    );
    res
      .status(200)
      .json({ status: "ok", msg: "material deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error, msg: "failed to delete material" });
  }
};

module.exports = {
  getAllMaterials,
  addNewMaterial,
  editMaterial,
  deleteMaterial,
};
