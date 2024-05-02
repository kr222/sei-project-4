const express = require("express");
const {
  getAllMaterials,
  addNewMaterial,
  editMaterial,
  deleteMaterial,
} = require("../controllers/inventory");

const { authStaff } = require("../middleware/authMiddleware");

const { errorCheck } = require("../validators/errorCheck");

const {
  validateMaterialName,
  validateMaterialQuantity,
} = require("../validators/inventoryValidator");

const router = express.Router();

router.get("/materials", getAllMaterials);
router.put(
  "/add",
  authStaff,
  validateMaterialName,
  validateMaterialQuantity,
  errorCheck,
  addNewMaterial
);
router.post(
  "/edit",
  authStaff,
  validateMaterialQuantity,
  errorCheck,
  editMaterial
);
router.delete("/delete", authStaff, deleteMaterial);

module.exports = router;
