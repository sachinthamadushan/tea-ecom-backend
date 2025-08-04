const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const upload = require("../middleware/upload");

router.post("/create", upload.single('image'), 
productController.createProduct);
router.get("/getAll", productController.getProducts);
router.put("/update/:id", upload.single('image'), 
productController.updateProduct);
router.get("/get/:id", productController.productFindById);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;