const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

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
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProduct = async(req,res) =>{
    try {
        const { title, description, price } = req.body
        let updateData = {title,description,price};

        if(req.file){
            updateData.image = `/uploads/${req.file.filename}`;

            const oldProduct = await Product.findById(req.params.id);
            if(oldProduct.image){
                const imgPath = path.join(__dirname,'../uploads',oldProduct.image);
                if(fs.existsSync(imgPath)){
                    fs.unlinkSync(imgPath);
                }
            }
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,{new:true,runValidators:true});
        
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json({msg: 'Product Updated',product});
    } catch (error) {
        if(req.file){
            fs.unlinkSync(path.join(__dirname,'../uploads',req.file.filename));
        }
        res.status(500).json({ error: error.message });
    }
}

const productFindById = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    productFindById
}

