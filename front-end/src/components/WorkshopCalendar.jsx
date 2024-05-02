import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetch from "../hooks/useFetch";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";

const WorkshopCalendar = (props) => {
  const userCtx = useContext(UserContext);
  // calendar localisation
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // code for creating new booking
  const [showCreateBooking, setShowCreateBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingShop, setBookingShop] = useState("");

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
    console.log(bookingDate);
  };

  const handleShopChange = (event) => {
    setBookingShop(event.target.value);
    console.log(bookingShop);
  };

  // store events fetched from db
  const fetchData = useFetch();
  const [bookings, setBookings] = useState([]);

  // state for showing/hiding calendar
  const [showCal, setShowCal] = useState(true);

  const getBookings = async () => {
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

  const addBooking = async () => {
    try {
      const res = await fetchData(
        "/workshops/addBooking",
        "PUT",
        {
          workshop_type: bookingShop,
          booking_date: bookingDate,
          booking_cost: 1234,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        console.log(`booking added successfully`);
        getBookings();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const myEventsList = bookings.map((item) => {
    return {
      title: item.workshop_type,
      start: new Date(item.booking_date),
      end: new Date(item.booking_date),
    };
  });

  useEffect(() => getBookings, []);

  return (
    <>
      <br />
      {!showCal && (
        <Button
          variant="outlined"
          style={{ height: "50px" }}
          onClick={() => setShowCal(true)}
        >
          show cal
        </Button>
      )}
      {showCal && (
        <Button
          variant="outlined"
          style={{ height: "50px" }}
          onClick={() => setShowCal(false)}
        >
          hide cal
        </Button>
      )}
      {userCtx.role === "user" && (
        <Button
          style={{ height: "50px" }}
          variant="contained"
          onClick={() => {
            if (!showCreateBooking) {
              setShowCreateBooking(true);
            } else {
              addBooking();
              setShowCreateBooking(false);
            }
          }}
        >
          Create New Booking
        </Button>
      )}

      {showCreateBooking && (
        <>
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Select shop</InputLabel>
            <Select onChange={handleShopChange} style={{ height: "50px" }}>
              <MenuItem>Select shop</MenuItem>
              <MenuItem value="Wood Shop">Wood Shop</MenuItem>
              <MenuItem value="Metal Shop">Metal Shop</MenuItem>
            </Select>
          </FormControl>
          <input
            type="date"
            onChange={handleDateChange}
            style={{ height: "50px" }}
          ></input>
        </>
      )}

      {showCal && (
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          style={{ height: 500, margin: "15px" }}
        ></Calendar>
      )}
    </>
  );
};

export default WorkshopCalendar;

/*
TODO:
-[x] register page
-[x] sign in page
-[x] nav
-[x] backend calls for individual workshops
-[x] booking list component
-[x] inventory list component
-[x] user list component

- user
-[] view booking availability for wood shop and metal shop seperately
-[x] create workshop booking in backend and front end
-[x] edit workshop booking
-[x] delete workshop booking

- staff
-[x] current list of bookings
  -[x] staff booking list component
-[x] current inventory
  -[x] material inventory component
-[x] add item into inventory
-[x] edit inventory quantity

- admin 
-[x] admin dashboard
-[x] edit user (only role for now)
-[x] delete user

- backend
-[x] create workshop booking
-[x] edit workshop booking
-[x] create new material inventory item
-[x] edit material inventory item quantity
-[x] edit user role 
-[x] delete user
-[x] middleware (authUser, authStaff, authAdmin)
-[] validators (express-validator, it's the .not().isEmpty() shit)

-[x] show/hide cal in 1 shortcircuit button
*/
