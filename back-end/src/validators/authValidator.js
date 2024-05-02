const { body } = require("express-validator");

const validateRegistrationData = [
  body("username", "username is required").notEmpty(),
  body("username", "username must be an email").isEmail(),
  body("password", "password is required").notEmpty(),
];

const validateLoginData = [
  body("username", "username is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
};
