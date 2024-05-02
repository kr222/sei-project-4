const express = require("express");
const {
  getAllBookings,
  addNewBooking,
  editBooking,
  deleteBooking,
  getWoodBookings,
  getMetalBookings,
} = require("../controllers/workshops");

const { authUser, authStaff } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", getAllBookings);
router.get("/wood", getWoodBookings);
router.get("/metal", getMetalBookings);
router.put("/addBooking", authUser, addNewBooking);
router.post("/editBooking", authStaff, editBooking);
router.delete("/deleteBooking", authStaff, deleteBooking);

module.exports = router;
