const express = require("express");
const {
  getAllUsers,
  register,
  login,
  refresh,
  editRole,
  deleteUser,
} = require("../controllers/auth");

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/editRole", editRole);
router.delete("/delete", deleteUser);

module.exports = router;
