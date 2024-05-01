import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Grid align="center">
        <Typography>Page not found</Typography>
        <Link to="/">Return home</Link>
      </Grid>
    </>
  );
};

export default NotFound;
