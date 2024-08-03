const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product --- MANAGER
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL THE PRODCUTS
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.find();

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products --- Admin
// exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
//   const products = await Product.find();

//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

// Get Single Product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// UPDATE THE PRODUCTS --- MANAGER
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete the Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
