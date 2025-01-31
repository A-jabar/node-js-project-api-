const User = require("../models/users");
const sendEmail = require("../utils/mailer");
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        // TODO: 1. Get email and password from request body
        const { email, password } = req.body;

        // TODO: 2. Find user by credentials
        const user = await User.findOne({email});
       
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // TODO: 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email orpassword"
            });
        }
        // TODO: 3. Generate auth token
        const token = user.generateAuthToken();

        // TODO: 4. Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token
            }
        });

    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        // TODO: 1. Get name, email and password from request body
        const { name, email, password } = req.body;

        const isExixting = await User.findOne({email});

        if (!isExixting) {
           
            const user = await User.create({ name, email, password });

            // TODO: 3. Generate auth token
            const token = user.generateAuthToken();
    
            // TODO: 4. Send response
            res.status(200).json({
                success: true,
                message: "Registration successful",
                data: {
                    user,
                    token
                }
            });
            
        }else{
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // TODO: 2. Create user
       

    } catch (error) {
        next(error)
    }
}

exports.forgetPassword = async (req, res, next) => {
    try {
        // TODO: 1. Get email from request body
        const { email } = req.body;

        // TODO: 2. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email "
            });
        }

        // TODO: 3. Generate reset password token
        const token = await user.generateResetPasswordToken();

        // TODO: 4. Send email
        await sendEmail(user.email, "Reset Password", `http://localhost:3000/reset-password/${token}`);

        // TODO: 3. Send response
        res.status(200).json({
            success: true,
            message: "Password reset link sent successfully",
            data: user
        });

    } catch (error) {
        next(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        // TODO: 1. Get token and password from request body
        const { token, password } = req.body;

        // TODO: 2. Find user by token
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });

        // TODO: 3. Update password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // TODO: 4. Send response
        sendEmail(user.email, "Reset Password", "Password reset successful");

        res.status(200).json({
            success: true,
            message: "Password reset successful",
            data: user
        });

    } catch (error) {
        next(error)
    }
}