const express = require("express");


const {createproduct, displayproducts, updateproduct, deleteproduct} = require("../controlles/productcontroller");

const router = express.Router();

router.post("/products", createproduct);
router.get("/products", displayproducts);
router.put("/products/:name", updateproduct);
router.delete("/products/:name", deleteproduct);

module.exports = router;