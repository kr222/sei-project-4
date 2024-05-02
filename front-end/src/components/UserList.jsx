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
import UserListItem from "./UserListItem";

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
                    <UserListItem
                      id={item.id}
                      username={item.username}
                      role={item.role}
                      getAllUsers={getAllUsers}
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

export default UserList;
