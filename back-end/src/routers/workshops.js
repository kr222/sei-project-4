const express = require("express");
const {
  getAllBookings,
  addNewBooking,
  editBooking,
  deleteBooking,
} = require("../controllers/workshops");

const router = express.Router();

router.get("/all", getAllBookings);
router.put("/addBooking", addNewBooking);
router.post("/editBooking", editBooking);
router.delete("/deleteBooking", deleteBooking);

module.exports = router;
