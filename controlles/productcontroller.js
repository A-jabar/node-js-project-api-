const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
    try {

        const products = await Product.find({});

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });

    } catch (error) {
        next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {

        const {name,price, category, description, image, rating, numReviews,countInStock} = req.body;

        const productExists = await Product.findOne({name});

        if(productExists){
            const updateProduct = await products.findOneAndUpdate({price}, {rating}, {countInStock}, {new: true});
            res.status(201).json({
              success: true,
              message: "product is alrady existing but we  updated only the countInStock, rating and the price",
              product: updateProduct
            });
            return;
          }

        const product = await Product.create({name,price, category, description, image, rating, numReviews,countInStock});

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const {name} = req.params;
        
        const product = await Product.findOne({name});
        if (!product){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
        }

        const updatedproduct = await Product.findByIdAndUpdate(name, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            product: updatedproduct
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {

        const {name} = req.params;

        const product = await Product.findOne(name);
        if (!product){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
        }

        await Product.findByIdAndDelete(name);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });

    } catch (error) {
        next(error);
    }
}