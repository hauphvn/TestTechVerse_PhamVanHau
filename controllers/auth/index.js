const User = require('../../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req, res) {
        // login logic
    }

    async register(req, res) {
        try {

            const {name, email, password} = req.body;
            // Check if user exists
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            }

            // Create new user
            const user = await User.create({name, email, password, provider: 'email'});

            // Generate token
            const token = this.generateToken(user);
            console.log(token);


            res.status(201).json({
                message: 'User created successfully',
                user
            });
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }

// generate token function
    generateToken = (user) => {
        return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
}


module.exports = new AuthController();
