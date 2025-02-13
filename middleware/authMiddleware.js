const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.header("Authorization"); // Look for Authorization header

    // Check if token exists and starts with "Bearer "
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Remove "Bearer " part
    } else {
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