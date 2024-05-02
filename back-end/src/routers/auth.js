const express = require("express");
const {
  getAllUsers,
  register,
  login,
  refresh,
  editRole,
  deleteUser,
} = require("../controllers/auth");

const { authAdmin } = require("../middleware/authMiddleware");

const { errorCheck } = require("../validators/errorCheck");

const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/authValidator");

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", validateRegistrationData, errorCheck, register);
router.post("/login", validateLoginData, errorCheck, login);
router.post("/refresh", refresh);
router.post("/editRole", authAdmin, editRole);
router.delete("/delete", authAdmin, deleteUser);

module.exports = router;
