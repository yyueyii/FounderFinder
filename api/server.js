require('events').EventEmitter.defaultMaxListeners = 15;

const cookieParser = require('cookie-parser');
const express = require("express");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5001;

const http = require('http').createServer(app);
// const io = require("socket.io")(http);

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true // Allow cookies and authorization headers
    }
});

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));
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
require('./MatchModel');

const Chat = require('./models/chat.model');
const Message = require('./models/message.model');
const User = mongoose.model("UserInfo");
const Match = require('./MatchModel'); 

app.get("/", (req, res) => {
    res.send({
        status: "Started"
    })
})

const sendVerificationEmail = async (email, verificationToken) => {

  const sender = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "founderfinderorbital@gmail.com",
      pass: "wdxl sans txqe dcdj",
    },
  });

  const mailOptions = {
    from: "FounderFinder",
    to: email,
    subject: "[FounderFinder] Email verification",
    text: `Hey there!
    
    Thanks so much for signing up with FounderFinder :)
    
    Please click on the following link to verify your email : https://founderfinder-1-cfmd.onrender.com/verify/${verificationToken}
    
    Happy connecting!
    
    From the FounderFinder Team`,
  };

  try {
    await sender.sendMail(mailOptions);
    console.log("Email sent!")
  } catch (error) {
    console.log("Error sending the verification email: ", error);
  }
};


app.post('/sign-up', async(req,res) => {
  const {email, password} = req.body;

  const oldUser = await User.findOne({email:email});

  if (oldUser) {
      return res.send({data: "User already exists!"});
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
      const newUser = await User.create({
          email: email,
          password: encryptedPassword,
      });

      console.log("we got til here", newUser)

      const token = jwt.sign({email:newUser.email}, JWT_SECRET);

      console.log("this is the token: ", token)

      newUser.verificationToken = token;
      console.log("This is our verification token: ", newUser.verificationToken)
      await newUser.save();
      sendVerificationEmail(newUser.email, newUser.verificationToken);

      res.send({status: "ok", data: "User Created"});
  } catch (error) {
      res.send({status: "error", data: error});
  }
});

app.post("/send-email/:id", async (req,res) => {
  try {
    const {id} = req.params;
    console.log("This is the id in send email", id)
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("This is the user in send email", user)
    sendVerificationEmail(user.email, user.verificationToken);
    console.log("email resent!")
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.log("Error in send email link: ", error);
  }
  
})

app.post("/log-in", async(req, res) => {
  const {email, password} = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
      return res.send("User does not exist");
  } 

  if (await bcrypt.compare(password, oldUser.password)) {
      const token = jwt.sign({email:oldUser.email}, JWT_SECRET);

     
       res.send({status: "ok", data: token});
  } else {
      res.send("Wrong password!");
      
  }
  
});

//This is so that we can verify the user
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Yay! Email verified successfully" });
  } catch (error) {
    console.log("errror", error);
    res.status(500).json({ message: "Oh no! Email verification failed" });
  }
});

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
});

app.patch('/match/:myId/:otherUserId', async (req, res) => {
  const { myId, otherUserId } = req.params;
  try {
      let otherUserMatch = await Match.findOne({user1: otherUserId, user2: myId});  // see if other person have matched  
      let userMatch = await Match.findOne({ user1: myId, user2: otherUserId});
      if (otherUserMatch) { 
          const updatedMatch = await Match.findOneAndUpdate({_id: otherUserMatch._id}, {$set: {matched: true}}, {new: true});
          res.status(200).json(updatedMatch);

      } else if (userMatch) {  
          res.status(200).json(userMatch);

      } else {  
          let match = new Match({
              user1: myId,
              user2: otherUserId,
              matched: false
          });
          await match.save();
          res.status(200).json(match);
      }
  } catch (error) {
      console.error('Error creating or updating match:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}); 


app.get('/successfulMatches/:id', async (req, res) => {
  const {id} = req.params;
  try {
      const objectId = new mongoose.Types.ObjectId(id);
      const match =  await Match.find({
          $or: [
              {user1: id, matched: true, notifViewed:true},
              {user2: id, matched: true} 
          ]
      })
      .sort({updatedAt: -1})
      .exec();

      const matchIds = match.map(entry => entry.user1.equals(id) ? entry.user2 : entry.user1);

      const matchedProfilesWithoutChats = [];
      for (const item of matchIds) {
          const existingChat = await Chat.findOne({
              participants: { $all: [id, item] } 
          });
  
          if (!existingChat) {
              matchedProfilesWithoutChats.push(item);
          }
      }

      const populatedMatches = await User.find({
          _id: { $in: matchedProfilesWithoutChats }
        }).select('name pic');

      res.status(200).json(populatedMatches);
  
  } catch (err) {
      res.status(500).json({ error: err.message });

  }

});

app.get('/getNotification/:id', async(req, res) => {
  const { id } = req.params;
  const { ObjectId } = mongoose.Types;

  console.log("This is id in getNotif: ", id)

  if (!id) {
    return res.status(400).json({ error: 'ID parameter is missing or invalid' });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ObjectId format' });
  }

  const objectId = new ObjectId(id);

  console.log("This is the object created by the id in get notif: ", objectId)

//   const objectId = new mongoose.Types.ObjectId(id);

  try {
      const notif = await Match.find({ user1: objectId, matched: true, notifViewed: false })
                               .populate({ path: 'user2', select: 'name pic' });
    // Only get the user2's name and pic
      const transformed = notif.map(match => ({
                                  user2:  match.user2

                               }));
      console.log("getNotif function in server worked!")
      res.status(200).json(transformed);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }

});

   //updates notif after viewing 
   app.patch('/updateNotification/:myId/:otherUserId', async(req, res) => {
    const {myId, otherUserId} = req.params;
    try {
        const match = await Match.findOneAndUpdate({ user1: myId, user2: otherUserId, matched:true }, { notifViewed: true }, { new: true })
        if (!match) {

        }
        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

 //get profiles for home page - prioritises one-sided match & users with at least one common sector, exclude self and liked/matched
 app.get('/getProfiles/:id', async(req, res) => {
  const {id} = req.params;

  try {
      const user = await User.findById(id);
      const userSectors = user.sectors;

      const remove = await Match.find({
        $or: [
            { user1: id },
            { user2: id, matched: true }
        ]
    }).exec();

    const removeUserIds = remove.map(entry => (
        entry.user1.equals(id) ? entry.user2 : entry.user1
    ));

      const prioritizedProfiles1 = await User.find({
          _id: { $nin: [id, ...removeUserIds] }, 
          published: true,
          sectors: { $in: userSectors }
        }).exec();
      const groupOneIds = prioritizedProfiles1.map(profile => profile._id);

      const prioritizedMatches = await Match.find({
          user2: id,
          matched: false
      }).exec();
      const groupTwoIds = prioritizedMatches.map(match => match.user1);
      const prioritizedProfiles2 = await User.find({
          _id: { $in: groupTwoIds, $nin: [id, ...groupOneIds, ...removeUserIds] }, 
          published: true
        }).exec();

      

      const profiles = await User.find({ 
          _id: { $nin: [id, ...removeUserIds, ...groupOneIds, ...groupTwoIds] }, 
          published:true 
      }).exec();

      const result = [...prioritizedProfiles2, ...prioritizedProfiles1, ...profiles]
      res.status(200).json(result);
  }catch (err) {
      res.status(500).json({error: err});
  }
});

  app.get('/matchesnochats/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('matches.userId').exec();
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const sortedMatches = user.matches.sort((a, b) => b.matchedAt - a.matchedAt);
      const matchedProfiles = sortedMatches.map(match => match.userId);

      const matchedProfilesWithoutChats = [];

        for (const profile of matchedProfiles) {
        const existingChat = await Chat.findOne({
            participants: { $all: [id, profile._id] } 
        });

        if (!existingChat) {
            matchedProfilesWithoutChats.push(profile);
        }
    }

      res.status(200).json(matchedProfilesWithoutChats);

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
      }, { messages: 1, _id: 0 }).sort({updatedAt:-1}).populate("messages");

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
        //const { id } = req.body;
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
  

