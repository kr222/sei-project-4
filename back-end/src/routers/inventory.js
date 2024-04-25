const express = require("express");
const { getAllMaterials } = require("../controllers/inventory");

const router = express.Router();

router.get("/materials", getAllMaterials);

module.exports = router;
