import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay, enUS } from "date-fns";

const WorkshopCalendar = (props) => {
  // // calendar localisation
  // const locales = {
  //   "en-US": enUS,
  // };

  // const localizer = dateFnsLocalizer({
  //   format,
  //   parse,
  //   startOfWeek,
  //   getDay,
  //   locales,
  // });

  // // store events fetched from db
  const fetchData = useFetch();
  const [bookings, setBookings] = useState([]);

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

  return (
    <>
      <button onClick={() => getBookings()}>dog</button>

      {/* <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      ></Calendar> */}
    </>
  );
};

export default WorkshopCalendar;
