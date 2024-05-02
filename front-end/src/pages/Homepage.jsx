import React from "react";
import WorkshopCalendar from "../components/WorkshopCalendar";
import InventoryList from "../components/InventoryList";

const Homepage = () => {
  return (
    <>
      <WorkshopCalendar />

      <InventoryList />
    </>
  );
};

export default Homepage;
