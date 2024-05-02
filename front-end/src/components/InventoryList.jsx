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
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import InventoryListItem from "./InventoryListItem";

const InventoryList = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [inventoryList, setInventoryList] = useState([]);
  const [addMaterial, setAddMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState("");
  const nameRef = useRef();
  const quantityRef = useRef();

  const handleMaterialChange = (event) => {
    setNewMaterial(event.target.value);
  };

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

  const addNewMaterial = async () => {
    try {
      const res = await fetchData("/inventory/add", "PUT", {
        material_type: newMaterial,
        material_name: nameRef.current.value,
        material_quantity: quantityRef.current.value,
      });
      if (res.ok) {
        console.log(`material added successfully`);
        getAllMaterials();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getAllMaterials, []);
  return (
    <>
      <Paper style={{ margin: "15px" }}>
        <Typography variant="h4">Current Inventory</Typography>

        {userCtx.role === "staff" && addMaterial && (
          <Button
            variant="contained"
            color="success"
            style={{ height: "50px", marginRight: "20px" }}
            onClick={() => {
              setAddMaterial(false);
              addNewMaterial();
            }}
          >
            Save
          </Button>
        )}
        {userCtx.role === "staff" && !addMaterial && (
          <Button
            variant="contained"
            color="success"
            style={{ height: "50px" }}
            onClick={() => setAddMaterial(true)}
          >
            Add new material
          </Button>
        )}
        {addMaterial && (
          <>
            <Select defaultValue="select" onChange={handleMaterialChange}>
              <MenuItem value="select">Material Type</MenuItem>
              <MenuItem value="Wood">Wood</MenuItem>
              <MenuItem value="Metal">Metal</MenuItem>
            </Select>
            <TextField
              label="Material Name"
              inputRef={nameRef}
              inputProps={{ minLength: 5 }}
            ></TextField>
            <TextField
              type="number"
              label="Material Quantity"
              inputRef={quantityRef}
              inputProps={{ min: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">pcs</InputAdornment>
                ),
              }}
            ></TextField>
          </>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material Type</TableCell>
                <TableCell>Material Name</TableCell>
                <TableCell>Quantity</TableCell>
                {userCtx.role === "staff" && (
                  <TableCell>Material Id</TableCell>
                )}{" "}
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
