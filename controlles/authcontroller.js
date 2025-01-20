const user = require("../models/users");

exports.register = async (req, res, next) => {
    try {
        const {name, email, phone, password} = req.body;
        const userExists = await user.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const createUser = await user.create({
            name,
            email,
            phone,
            password
        })
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: createUser
        });
        
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userExists = await user.findOne({email, password});
        if(!userExists){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        res.status(200).json({
            success: true,
            message: "User logged in successfully"
        });
    } catch (err) {
        next(err);
    }
}