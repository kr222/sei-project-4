const pool = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workshops");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const addNewBooking = async (req, res) => {
  const { workshop_type, booking_date, booking_cost } = req.body;
  try {
    const bookingID = uuidv4();
    const result = await pool.query(
      "INSERT INTO workshops (id, workshop_type, booking_date, booking_cost) VALUES ($1, $2, $3, $4) RETURNING *",
      [bookingID, workshop_type, booking_date, booking_cost]
    );
    res.json(result.rows);
    console.log(`Booking successfully created`);
  } catch (error) {
    console.log(error);
  }
};

// add check if id is in db for edit and delete
const editBooking = async (req, res) => {
  const { id, workshop_type, booking_date, booking_cost } = req.body;
  try {
    const result = await pool.query(
      "UPDATE workshops SET workshop_type = $2, booking_date = $3, booking_cost =$4 WHERE id=$1",
      [id, workshop_type, booking_date, booking_cost]
    );
    res.status(200).json({ status: "ok", msg: "booking updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error, msg: "failed to update booking" });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query("DELETE FROM workshops WHERE id=$1", [id]);
    res.status(200).json({ status: "ok", msg: "booking deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error, msg: "failed to delete booking" });
  }
};

module.exports = { getAllBookings, addNewBooking, editBooking, deleteBooking };
