import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        // Check if cookies exist and extract the token
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'User not authorized', success: false });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded || !decoded.UserId) {
            return res.status(401).json({
                message: 'User not authorized, token invalid or expired',
                success: false,
            });
        }

        // Attach user ID to the request object
        req.id = decoded.UserId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export default isAuthenticated;