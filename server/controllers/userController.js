const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received login request:", { email, password }); 

        // Find the user by email and password
        const user = await userModel.findOne({ email, password });
        console.log("User found:", user); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found or Invalid Credentials" });
        }

        const token = jwt.sign({ _id: user._id },process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(200).json({ success: true, message: "Login Successful", user, token });

    } catch (error) {
        console.error("Error during login:", error); // Debugging statement
        res.status(400).json({ success: false, error: error.message });
    }
};

const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

module.exports = { loginController, registerController};
