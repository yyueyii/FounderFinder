const jwt = require('jsonwebtoken');
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzI0ODA5OCwiaWF0IjoxNzE3MjQ4MDk4fQ.5TmHSOY8_04iv--a0qjXmsQ0AqtrK9fxCSmn8pGoIFw";
// process.env.JWT_SECRET
const generate = (userId, res) => {
    console.log("test: " + userId)
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '15d',
    });

    console.log("token: " + token);

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return { userId, token };
};

module.exports = generate;