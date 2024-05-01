import React from "react";
import InventoryList from "../components/InventoryList";
import BookingList from "../components/BookingList";

const Staff = () => {
  return (
    <>
      <BookingList />
      <br />
      <InventoryList />
    </>
  );
};

export default Staff;
