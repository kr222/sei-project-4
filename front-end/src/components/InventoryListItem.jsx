import { TableCell, Button, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import useFetch from "../hooks/useFetch";

const InventoryListItem = ({ id, type, name, quantity, getAllMaterials }) => {
  const fetchData = useFetch();
  const [editQuantity, setEditQuantity] = useState(false);
  const quantityRef = useRef();

  const editMaterialQuantity = async () => {
    try {
      const res = await fetchData("/inventory/edit/", "POST", {
        id: id,
        material_quantity: quantityRef.current.value,
      });
      if (res.ok) {
        getAllMaterials();
        setEditQuantity(false);
        console.log(`quantity updated successfully`);
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMaterial = async () => {
    try {
      const res = await fetchData("/inventory/delete/", "DELETE", {
        id: id,
      });
      if (res.ok) {
        console.log(`material deleted successfully`);
        getAllMaterials();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableCell>{type}</TableCell>
      <TableCell>{name}</TableCell>
      {!editQuantity && <TableCell>{quantity}</TableCell>}
      {editQuantity && <TextField inputRef={quantityRef} />}
      <TableCell>{id}</TableCell>
      <TableCell>
        {!editQuantity && (
          <Button onClick={() => setEditQuantity(true)}>Edit Quantity</Button>
        )}
        {editQuantity && (
          <Button onClick={() => editMaterialQuantity()}>Save</Button>
        )}
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteMaterial()}>Delete</Button>
      </TableCell>
    </>
  );
};

export default InventoryListItem;
