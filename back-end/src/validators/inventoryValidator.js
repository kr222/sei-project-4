const { body } = require("express-validator");

const validateMaterialName = [
  body("material_name", "material name is required").notEmpty(),
  body("material_name", "material name is invalid").isLength({
    min: 2,
    max: 50,
  }),
];

const validateMaterialQuantity = [
  body("material_quantity", "material quantity is required").notEmpty(),
  body("material_quantity", "material quantity must be a number").isInt(),
];

module.exports = { validateMaterialName, validateMaterialQuantity };
