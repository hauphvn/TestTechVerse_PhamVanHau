const User = require('../../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
    constructor() {
        this.generateToken = this.generateToken.bind(this);
    }

    // generate token function
    generateToken(user) {
        // test
        return jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            // Check if user exists
            const userExist = await User.findOne({email});
            if (!userExist) {
                return res.status(400).json({message: 'Invalid credentials'});
            }
            // Check password
            const isMatch = await userExist.comparePassword(password);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            // Generate token
            const token = this.generateToken(userExist);
            return res.status(200).json({token});
        } catch (e) {
            return res.status(500).json({
                message: 'Login failed',
                error: await e.message
            });
        }

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

            res.status(201).json({
                message: 'User created successfully',
                token
            });
        } catch (e) {
            res.status(500).json({message: e.message});
        }

    }
}


module.exports = new AuthController();
