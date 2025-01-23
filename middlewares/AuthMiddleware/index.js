const jwt = require('jsonwebtoken');
const User = require('../../models/User');
class AuthMiddleware {
    async requireAuth(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if(!token){
                return res.status(401).json({
                    message: 'No token provided'
                });
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode.id).select('-password');

            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            req.user = user;
            next();
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                return res.status(401).json({message: 'Token expired'});
            }
            res.status(401).json({message: 'Unauthorized', error: e.message});
        }
    }
}

module.exports = new AuthMiddleware();
