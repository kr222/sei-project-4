import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetch from "../hooks/useFetch";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Button } from "@mui/material";

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

  const myEventsList = bookings.map((item) => {
    return {
      title: item.workshop_type,
      start: new Date(item.booking_date),
      end: new Date(item.booking_date),
    };
  });

  return (
    <>
      <Button variant="contained" onClick={() => getBookings()}>
        dog
      </Button>
      <Button onClick={() => setShowCal(true)}>show cal</Button>
      <Button onClick={() => setShowCal(false)}>hide cal</Button>

      {showCal && (
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        ></Calendar>
      )}
    </>
  );
};

export default WorkshopCalendar;

/*
TODO:
-[] register page
-[] sign in page
-[] nav

- user
-[] view booking availability for wood shop and metal shop seperately
-[] create workshop booking in backend and front end
-[x] edit workshop booking
-[x] delete workshop booking

- staff
-[] current list of bookings
  -[] staff booking list component
-[] current inventory
  -[] material inventory component
-[] add item into inventory
-[] edit inventory quantity

- admin 
-[] admin dashboard
-[] edit user (only role for now)
-[] delete user

- backend
-[x] create workshop booking
-[x] edit workshop booking
-[x] create new material inventory item
-[x] edit material inventory item quantity
-[x] edit user role 
-[x] delete user
-[] middleware
-[] validators
*/
