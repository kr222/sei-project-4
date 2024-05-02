import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import useFetch from "../hooks/useFetch";
import BookingListItem from "./BookingListItem";

const BookingList = () => {
  const fetchData = useFetch();
  const [bookings, setBookings] = useState([]);

  const getAllBookings = async () => {
    try {
      const res = await fetchData(
        "/workshops/all",
        "GET",
        undefined,
        undefined
      );

      if (res.ok) {
        console.log(res.data);
        setBookings(res.data);
      } else {
        console.log(`bad dog`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getAllBookings, []);
  return (
    <>
      <Paper>
        <Typography variant="h4">Booking list</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Workshop Type</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Booking Cost</TableCell>
                <TableCell>Booking Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <BookingListItem
                      id={item.id}
                      type={item.workshop_type}
                      date={item.booking_date}
                      formattedDate={format(
                        new Date(item.booking_date),
                        "dd MMMM yyyy"
                      )}
                      cost={item.booking_cost}
                      getAllBookings={getAllBookings}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default BookingList;
