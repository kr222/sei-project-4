const express = require("express");
const { getAllWorkshops } = require("../controllers/workshops");

const router = express.Router();

router.get("/all", getAllWorkshops);

module.exports = router;
