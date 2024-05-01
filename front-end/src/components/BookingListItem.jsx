import { TableCell, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useRef } from "react";
import useFetch from "../hooks/useFetch";

const BookingListItem = ({
  id,
  type,
  date,
  formattedDate,
  cost,
  getAllBookings,
}) => {
  const fetchData = useFetch();
  const [editDate, setEditDate] = useState(false);
  const [newDate, setNewDate] = useState("");

  const handleDateChange = (event) => {
    setNewDate(event.target.value);

    console.log(newDate);
  };

  const updateBookingDate = async () => {
    try {
      const res = await fetchData("/workshops/editBooking/", "POST", {
        id: id,
        workshop_type: type,
        booking_date: newDate,
        booking_cost: cost,
      });
      if (res.ok) {
        getAllBookings();
        setEditDate(false);
        console.log(`date updated successfully`);
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async () => {
    try {
      const res = await fetchData("/workshops/deleteBooking/", "DELETE", {
        id: id,
      });
      if (res.ok) {
        console.log(`booking deleted successfully`);
        getAllBookings();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableCell>{type}</TableCell>
      {!editDate && <TableCell>{formattedDate}</TableCell>}
      {editDate && (
        <TableCell>
          <input type="date" onChange={handleDateChange}></input>
        </TableCell>
      )}
      <TableCell>{cost}</TableCell>
      {/* {editQuantity && <TextField inputRef={quantityRef} />} */}
      <TableCell>{id}</TableCell>
      <TableCell>
        {!editDate && (
          <Button onClick={() => setEditDate(true)}>Edit Date</Button>
        )}
        {editDate && <Button onClick={() => updateBookingDate()}>Save</Button>}
      </TableCell>
      <TableCell>
        {/* <Button onClick={() => console.log(`dog`)}>Edit</Button> */}
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteBooking()}>Delete</Button>
      </TableCell>
    </>
  );
};

export default BookingListItem;
