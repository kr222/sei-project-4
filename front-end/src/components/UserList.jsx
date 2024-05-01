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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const UserList = () => {
  const fetchData = useFetch();
  const [userList, setUserList] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await fetchData("/auth/users", "GET", undefined, undefined);

      if (res.ok) {
        console.log(res.data);
        setUserList(res.data);
      } else {
        console.log(`bad dog`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUserRole = async (id) => {
    try {
      const res = await fetchData("/auth/editRole/", "POST", {
        id: id,
        role: "staff",
      });
      if (res.ok) {
        console.log(`role updated successfully`);
        getAllUsers();
      } else console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
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

  useEffect(() => getAllUsers, []);
  return (
    <>
      <Paper>
        <Typography variant="h4">User list</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>User Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Button onClick={() => editUserRole(item.id)}>
                        Edit Role
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteUser(item.id)}>
                        Delete
                      </Button>
                    </TableCell>
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

export default UserList;
