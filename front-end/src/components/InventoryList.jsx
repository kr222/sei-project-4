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
import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import InventoryListItem from "./InventoryListItem";

const InventoryList = () => {
  const fetchData = useFetch();
  const [inventoryList, setInventoryList] = useState([]);

  const getAllMaterials = async () => {
    try {
      const res = await fetchData(
        "/inventory/materials",
        "GET",
        undefined,
        undefined
      );

      if (res.ok) {
        console.log(res.data);
        setInventoryList(res.data);
      } else {
        console.log(`bad dog`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getAllMaterials, []);
  return (
    <>
      <Paper>
        <Typography variant="h4">Inventory list</Typography>
        <Button onClick={() => getAllMaterials()}>test get inventory</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material Type</TableCell>
                <TableCell>Material Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Material Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryList.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <InventoryListItem
                      id={item.id}
                      type={item.material_type}
                      name={item.material_name}
                      quantity={item.material_quantity}
                      getAllMaterials={getAllMaterials}
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

export default InventoryList;
