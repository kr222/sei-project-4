import React from "react";
import WorkshopCalendar from "../components/WorkshopCalendar";
import BookingList from "../components/BookingList";
import InventoryList from "../components/InventoryList";
import UserList from "../components/UserList";

const Homepage = () => {
  return (
    <>
      <WorkshopCalendar />

      <InventoryList />
    </>
  );
};

export default Homepage;
