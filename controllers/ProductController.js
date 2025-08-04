const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        const product = await Product.create({ title, description, price, image });
        res.status(201).json({ msg: 'Product Created', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProducts  = async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts
}

