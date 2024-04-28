import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetch from "../hooks/useFetch";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

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
      <button onClick={() => getBookings()}>dog</button>
      <button onClick={() => setShowCal(true)}>show cal</button>
      {/* <div>{bookings[0].workshop_type}</div>
      <div>{bookings[0].booking_date}</div>
      <div>{bookings[0].booking_cost}</div> */}
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
