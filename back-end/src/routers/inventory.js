const express = require("express");
const {
  getAllMaterials,
  addNewMaterial,
  editMaterial,
  deleteMaterial,
} = require("../controllers/inventory");

const router = express.Router();

router.get("/materials", getAllMaterials);
router.put("/add", addNewMaterial);
router.post("/edit", editMaterial);
router.delete("/delete", deleteMaterial);

module.exports = router;
