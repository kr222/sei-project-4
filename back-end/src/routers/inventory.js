const express = require("express");
const { getAllMaterials, addNewMaterial } = require("../controllers/inventory");

const router = express.Router();

router.get("/materials", getAllMaterials);
router.put("/add", addNewMaterial);

module.exports = router;
