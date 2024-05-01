const express = require("express");
const {
  getAllBookings,
  addNewBooking,
  editBooking,
  deleteBooking,
  getWoodBookings,
  getMetalBookings,
} = require("../controllers/workshops");

const router = express.Router();

router.get("/all", getAllBookings);
router.get("/wood", getWoodBookings);
router.get("/metal", getMetalBookings);
router.put("/addBooking", addNewBooking);
router.post("/editBooking", editBooking);
router.delete("/deleteBooking", deleteBooking);

module.exports = router;
