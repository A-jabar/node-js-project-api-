const express = require('express');

const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controlles/productcontroller');

const { allowedRoles } = require('../midlewares/isAllowed');
const { jwtmiddleware } = require('../midlewares/jwtMidleware');

router.get('/product', jwtmiddleware, allowedRoles('admin', 'user'), getProducts);
router.post('/product', jwtmiddleware, allowedRoles('admin'), createProduct);
router.patch('/product:name', jwtmiddleware, allowedRoles('admin'), updateProduct);
router.delete('/product:name', jwtmiddleware, allowedRoles('admin'), deleteProduct);

module.exports = router;