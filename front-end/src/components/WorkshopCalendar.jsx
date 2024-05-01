import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetch from "../hooks/useFetch";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Button, Select, MenuItem, TextField } from "@mui/material";

const WorkshopCalendar = (props) => {
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

  // store events fetched from db
  const fetchData = useFetch();
  const [bookings, setBookings] = useState([]);

  // state for showing/hiding calendar
  const [showCal, setShowCal] = useState(false);

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
      const res = await fetchData("/workshops/addBooking", "PUT", {
        workshop_type: "Wood Shop",
        booking_date: "2024-05-05",
        booking_cost: 1234,
      });
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
      <Button variant="contained" onClick={() => addBooking()}>
        dog
      </Button>
      <Button onClick={() => setShowCal(true)}>show cal</Button>
      <Button onClick={() => setShowCal(false)}>hide cal</Button>
      <Select>
        <MenuItem>asdf</MenuItem>
        <MenuItem>qwer</MenuItem>
      </Select>
      <input type="date"></input>

      {showCal && (
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          style={{ height: 500 }}
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
-[] create workshop booking in backend and front end
-[x] edit workshop booking
-[x] delete workshop booking

- staff
-[x] current list of bookings
  -[x] staff booking list component
-[x] current inventory
  -[x] material inventory component
-[] add item into inventory
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
-[] middleware (authUser, authStaff, authAdmin)
-[] validators (express-validator, it's the .not().isEmpty() shit)
*/
