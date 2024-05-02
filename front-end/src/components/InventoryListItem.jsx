import { TableCell, Button, TextField } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const InventoryListItem = ({ id, type, name, quantity, getAllMaterials }) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [editQuantity, setEditQuantity] = useState(false);
  const quantityRef = useRef();

  const editMaterialQuantity = async () => {
    try {
      const res = await fetchData(
        "/inventory/edit/",
        "POST",
        {
          id: id,
          material_quantity: quantityRef.current.value,
        },
        userCtx.accessToken
      );
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
      const res = await fetchData(
        "/inventory/delete/",
        "DELETE",
        {
          id: id,
        },
        userCtx.accessToken
      );
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
      {editQuantity && (
        <TableCell>
          <TextField inputRef={quantityRef} defaultValue={quantity} />
        </TableCell>
      )}
      {userCtx.role === "staff" && <TableCell>{id}</TableCell>}{" "}
      <TableCell>
        {!editQuantity && userCtx.role === "staff" && (
          <Button onClick={() => setEditQuantity(true)}>Edit Quantity</Button>
        )}
        {editQuantity && (
          <Button onClick={() => editMaterialQuantity()}>Save</Button>
        )}
      </TableCell>
      <TableCell>
        {!editQuantity && userCtx.role === "staff" && (
          <Button onClick={() => deleteMaterial()}>Delete</Button>
        )}
        {editQuantity && (
          <Button onClick={() => setEditQuantity(false)}>Cancel</Button>
        )}
      </TableCell>
    </>
  );
};

export default InventoryListItem;
