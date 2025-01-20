const products = require("../models/products");

exports.createproduct = async (req, res, next) =>{
    try {
        const {name, description, price, image, category, quantity} = req.body;
        const productExists = await products.findOne({name});
        if(productExists){
          const updateProduct = await products.findOneAndUpdate({name}, {quantity});
          res.status(201).json({
            success: true,
            message: "product is alrady existing but we only updated he quantity and the peice",
            product: updateProduct
          });
          return;
        }

        const createProduct = await products.create({
            name,
            description,
            price,
            image,
            category,
            quantity
        });
        res.status(200).json({
            success: true,
            message: "product created successfully"
        })
    } catch (err) {
        next(err);
    }
}

exports.displayproducts = async (req, res, next) =>{
    try {
        const product = await products.find({});
        res.status(200).json({
            success: true,
            product
        })
        
    } catch (err) {
        next(err)
    }
}

exports.updateproduct = async (req, res, next) =>{
    try {
        const {name} = req.params;
        
        const product = await products.findOne({name});
        if (!product){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
        }

        const updateProduct = await products.findOneAndUpdate({name}, req.body, {new: true});
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            product: updateProduct
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteproduct = async (req, res, next) =>{
    try {
        const {name} = req.params;
        console.log(name);
        
        const product = await products.findOne({name});
        if (!product){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
        }

        const deleteProduct = await products.findOneAndDelete({name});
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            product: deleteProduct
        });
    } catch (err) {
        next(err);
    }
}