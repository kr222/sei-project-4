import React, { useState } from "react";
import { Typography, Button, TableCell, Select, MenuItem } from "@mui/material";
import useFetch from "../hooks/useFetch";

const UserListItem = ({ id, username, role, getAllUsers }) => {
  const fetchData = useFetch();
  const [editRole, setEditRole] = useState(false);
  const [newRole, setNewRole] = useState("");

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
    console.log(`dog ${newRole}`);
  };

  const editUserRole = async () => {
    try {
      const res = await fetchData("/auth/editRole/", "POST", {
        id: id,
        role: newRole,
      });
      if (res.ok) {
        console.log(`role updated successfully`);
        getAllUsers();
        setEditRole(false);
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetchData("/auth/delete/", "DELETE", {
        id: id,
      });
      if (res.ok) {
        console.log(`user deleted successfully`);
        getAllUsers();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TableCell>{username}</TableCell>
      {!editRole && <TableCell>{role}</TableCell>}
      {editRole && (
        <TableCell>
          <Select value={newRole} onChange={handleRoleChange}>
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="staff">staff</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </Select>
        </TableCell>
      )}
      <TableCell>{id}</TableCell>
      <TableCell>
        {!editRole && (
          <Button onClick={() => setEditRole(true)}>Edit Role</Button>
        )}
        {editRole && <Button onClick={() => editUserRole()}>Save</Button>}
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteUser()}>Delete</Button>
      </TableCell>
    </>
  );
};

export default UserListItem;
