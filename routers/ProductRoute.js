const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const upload = require("../middleware/upload");

router.post("/create", upload.single('image'), 
productController.createProduct);
router.get("/getAll", productController.getProducts);

module.exports = router;