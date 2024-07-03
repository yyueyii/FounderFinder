const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 5001;
const Match = require('./MatchModel'); 
const User = require('./UserDetails'); 


app.use(express.json());
app.use(cors()); 
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb");
const mongoUrl = "mongodb+srv://gabriellegtw:Gabrielle1705!@cluster0.dek3rxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzI0ODA5OCwiaWF0IjoxNzE3MjQ4MDk4fQ.5TmHSOY8_04iv--a0qjXmsQ0AqtrK9fxCSmn8pGoIFw";

mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB");
})

require('./UserDetails');
require('./MatchModel');

// const User = mongoose.model("UserInfo");

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

       
         res.send({status: "ok", data: token});
    } else {
        res.send("Wrong password!");
        
    }
    
})


//get id from email upon log in 
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

  //matching, if matching is successful, show "me" notif immediately, append my Id to other User's notifArray
//   const Match = mongoose.model("Matches");
    app.patch('/match/:myId/:otherUserId', async (req, res) => {
        const { myId, otherUserId } = req.params;
        try {
            let otherUserMatch = await Match.findOne({user1: otherUserId, user2: myId});  // see if other person have matched  
            let userMatch = await Match.findOne({ user1: myId, user2: otherUserId});
            if (otherUserMatch) { // if other user alr liked --> match is made
                const updatedMatch = await Match.findOneAndUpdate({_id: otherUserMatch._id}, {$set: {matched: true}}, {new: true});
                res.status(200).json(updatedMatch);

            } else if (userMatch) {  //if logged in user alr liked --> do nth
                res.status(200);

            } else {  // if neither haved liked --> create a new one
                match = new Match({
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

    //get all successful matches todo:modify
    app.get('/successfulMatches/:id', async (req, res) => {
            const {id} = req.params;
            try {
                const objectId = new mongoose.Types.ObjectId(id);
                const match =  await Match.aggregate([
                {
                    $match: { 
                        $and: [
                            {matched: true},
                            {$or: [{ user1: objectId}, { user2: objectId }]}
                        ]
                    }
                },
                {
                    $addFields: {
                        otherUser: {
                            $cond: {
                                if: { $eq: ['$user1', objectId] },
                                then: '$user2',
                                else: '$user1'
                            }
                        }
                    }
                },
                {
                    $sort: { timestamp: -1 }
                },
                {
                    $project: {
                        _id: 1,
                        otherUser: 1,
                    }
                }
            ]);
            const populatedMatches = await User.populate(match, { path: 'otherUser', select: 'name pic' });

            res.status(200).json(populatedMatches);
            
            } catch (err) {
                res.status(500).json({ error: err.message });

            }
  
    });

    // find notif to be viewed by 'myId' todo:sort
    app.get('/getNotification/:id', async(req, res) => {
            const { id } = req.params;
            const objectId = new mongoose.Types.ObjectId(id);
            try {
                const notif = await Match.find({ user1: objectId, matched: true, notifViewed: false })
                                         .populate({ path: 'user2', select: 'name pic' });
                const transformed = notif.map(match => ({
                                            user2:  match.user2

                                         }));
     
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


    //get profiles for home page (temp)
    app.get('/getProfiles', async(req, res) => {
        const {id} = req.params;
        try {
            const profiles = await User.find({ _id: {$ne: id}, published:true }).exec();
            res.status(200).json(profiles);
        }catch (err) {
            res.status(500).json({error: err});
        }
    });


             

    








app.listen(port, () => {
    console.log("NodeJS started");
})