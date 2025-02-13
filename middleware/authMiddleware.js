const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};