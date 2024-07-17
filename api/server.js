require('events').EventEmitter.defaultMaxListeners = 15;

const cookieParser = require('cookie-parser');const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5001;

const http = require('http').createServer(app);
// const io = require("socket.io")(http);

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8081",
        methods: ["GET", "POST"],
        credentials: true // Allow cookies and authorization headers
    }
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// const Server = require('socket.io').Server;
const protectRoute = require("./middleware/protectRoute");
const generate = require("./utils/generateToken");
const mongoUrl = "mongodb+srv://gabriellegtw:Gabrielle1705!@cluster0.dek3rxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzI0ODA5OCwiaWF0IjoxNzE3MjQ4MDk4fQ.5TmHSOY8_04iv--a0qjXmsQ0AqtrK9fxCSmn8pGoIFw";

mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB");
})

require('./UserDetails');

const Chat = require('./models/chat.model');
const Message = require('./models/message.model');
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

        const tokenInfo = generate(newUser._id, res);  
        const { userId, token } = tokenInfo;

        res.send({status: "ok", data: "User Created", userId, token});
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
        // const token = jwt.sign({email:oldUser.email}, JWT_SECRET);

        const tokenInfo = generate(oldUser._id, res);  // Chamge this to above and also the the return statemtents
        const { userId, token } = tokenInfo;

        if (res.status(201)) {

            return res.send({status: "ok", userId, data: tokenInfo});
        } else {
            return res.send({error: "error"});
        }
    }
    
})

app.get('/getId/:email', async(req, res) => {
    const { email } = req.params;
    try {
        // Find user by email in database
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ userId: user._id });
      } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.put('/edit-profile/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({message: "Not found"});
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/profile/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch(error) {
        res.status(500).json({message:error.message});
    }
})


app.get('/matches/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('matches.userId').exec();
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const sortedMatches = user.matches.sort((a, b) => b.matchedAt - a.matchedAt);
      const matchedProfiles = sortedMatches.map(match => match.userId);
      res.status(200).json(matchedProfiles);

    } catch (error) {
      console.error('Error fetching matched profiles:', error);
      res.status(500).json({ error: 'Failed to fetch matched profiles' });
    }
  });

  app.get("/chats", async (req, res) => {
    try {
    //   const { senderId } = req.body;
      const { senderId } = req.query;
      console.log("checking if id is defined in /chats in server: ")
    
      console.log(senderId);

      const chats = await Chat.find({
        participants: { $all: [senderId] }
      }, { messages: 1, _id: 0 }).populate("messages");

    console.log(chats)
  
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ message: "Error in getting messages", error });
    }
  });

  app.get("/messages", async (req, res) => {
    try {
    //   const { senderId, receiverId } = req.body;
      const { senderId, receiverId } = req.query;
      console.log("checking if id is defined in /messages in server: ")
    
      console.log(senderId);
      console.log(receiverId);

      const messages = await Chat.findOne({
        participants: { $all: [senderId, receiverId] }
      }, { messages: 1, _id: 0 }).populate("messages");

    console.log(messages)
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error in getting messages", error });
    }
  });

  //Get name of the person
  app.get("/getname", async (req, res) => {
    try {
        // const { id } = req.body;
        const { id } = req.query;

        const name = await User.findOne({ 
            _id: id,
        }, { name: 1, _id: 0 });

        console.log("This is name from server:", name)

        res.status(200).json(name);
    } catch (error) {
        console.log("Error in getting name in server: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
})

  //Get pic of the person
  app.get("/getpic", async (req, res) => {
    try {
        // const { id } = req.body;
        const { id } = req.query;

        const pic = await User.findOne({ 
            _id: id,
        }, { pic: 1, _id: 0 });

        console.log("This is pic from server:", pic)

        if (pic == null) {
            res.status(200).json(null);
        } else {
            res.status(200).json(pic);
        }

    } catch (error) {
        console.log("Error in getting pic in server: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
})

  // Gets all messages in a conversation based on a userId
  app.get("/:id", protectRoute, async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const chat = await Chat.findOne({ 
            participants: {$all: [senderId, userToChatId] },
        }).populate("messages");

        if (!chat) {
            return res.status(200).json([]);
        }

        res.status(200).json(chat.messages);
    } catch (error) {
        console.log("Error in getMessages Controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
})

  app.post("/send/:id", protectRoute, async (req, res) => { 
    console.log("message sent", req.params.id);

    try {
        const {message} = req.body;
        const { id: receiverId } = req.params;
        console.log("look:" + req.user._id);
        const senderId = req.user._id;
        // const senderId = req.user;

        // console.log("this is the chat: "+ Chat)

        let chat = await Chat.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            chat.messages.push(newMessage._id);
        }

        await Promise.all([chat.save(), newMessage.save()]);

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
})

io.on("connection", (socket) => {
    console.log("a user is connected", socket.id);
  
    socket.on("sendMessage1", async (data) => {
      try {

        console.log("In the sendMessage1 in server")
        
        const { senderId, receiverId, message } = data;

        if (!senderId) {
            console.log("No sender id")
        }

        if (!receiverId) {
            console.log("No receiver id")
        }

        if (!message) {
            console.log("No message")
        }
        
        console.log("data", data);
  
        // const newMessage = new Chat({ senderId, receiverId, message });
        // await newMessage.save();

        let chat = await Chat.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        console.log(newMessage)

        if (newMessage) {
            console.log("pushing message into mongodb...")
            chat.messages.push(newMessage._id);
            console.log("pushed successfully!")
        }

        await Promise.all([chat.save(), newMessage.save()]);
  
        //emit the message to the receiver
        io.to(receiverId).emit("receiveMessage", newMessage);

        console.log("message emitted successfully")
      } catch (error) {
        console.log("Error handling the messages");
      }
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  });

//   io.on("connection", (socket) => {
//     console.log("a user connected", socket.id);

//     socket.on("disconnect", () => {
//         console.log("user disconnected", socket.id);
//     })
//   });
  

app.listen(port, () => {
    console.log("NodeJS started");
})

http.listen(8000, () => {
    console.log("Socket.IO server running on port 8000");
  });
  

