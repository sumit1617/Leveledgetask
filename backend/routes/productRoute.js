const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productControllers");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/manager/product/new")
  .post(isAuthenticatedUser, authorizeRoles("manager"), createProduct);

router
  .route("/manager/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("manager"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("manager"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
