const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5001;


app.use(express.json());
app.use(cors()); 
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const mongoUrl = "mongodb+srv://gabriellegtw:Gabrielle1705!@cluster0.dek3rxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzI0ODA5OCwiaWF0IjoxNzE3MjQ4MDk4fQ.5TmHSOY8_04iv--a0qjXmsQ0AqtrK9fxCSmn8pGoIFw";

mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB");
})

require('./UserDetails');

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({
        status: "Started"
    })
})

app.post('/sign-up', async(req,res) => {
    const {email, password} = req.body;

    const oldUser = await User.findOne({email:email});

    if (oldUser) {
        return res.send({data: "User already exists!"});
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            email: email,
            password: encryptedPassword,
        });
        res.send({status: "ok", data: "User Created"});
    } catch (error) {
        res.send({status: "error", data: error});
    }
});

app.post("/log-in", async(req, res) => {
    const {email, password} = req.body;
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
        return res.send("User does not exist");
    } 

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({email:oldUser.email}, JWT_SECRET);

        if (res.status(201)) {
            return res.send({status: "ok", data: token});
        } else {
            return res.send({error: "error"});
        }
    }
    

})

app.get('/profile', async(req, res) => {
    try {
        const profileData = await User.findOne({ userId: req.user.id }, {email: 0, password:0});
        
        res.json({ profileData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
})

app.listen(port, () => {
    console.log("NodeJS started");
})

