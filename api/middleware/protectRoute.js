const jwt = require('jsonwebtoken');
const User = require('../UserDetails');
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzI0ODA5OCwiaWF0IjoxNzE3MjQ4MDk4fQ.5TmHSOY8_04iv--a0qjXmsQ0AqtrK9fxCSmn8pGoIFw";

const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;

        // console.log(token);
        
        if (!token) {
            return res.status(401).json({error: "unauthorised - No token provided"});
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // console.log(decoded);

        if (!decoded) {
            return res.status(401).json( {error: "Invalid token"});
        }

        console.log("here: " + decoded.userId)

        const user = await User.findById(decoded.userId).select("-password");


        if (!user) {
            return res.status(404).json( {error: "User not found"});
        }

        req.user = user;
        
        // This calls send message function
        next();

    } catch (error) {
        console.log("Error in middleware: ", error.message)
        res.status(500).json( {error: error.message});
    }
}

module.exports = protectRoute;