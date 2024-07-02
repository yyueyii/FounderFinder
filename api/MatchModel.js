const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema ({
    user1: { //person who liked first
        type:mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    }, 
    user2: { //person who liked second and completed the match aka the logged in user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    }, 
    matched: {
        type: "Boolean",
        default: false,
    }, 
    notifViewed: {   //has user1 viewed notif?
        type: "Boolean",
        default: false
    }
    },
    {
        timestamps: true,
        collection:"Matches",
    }

);

MatchesSchema.index({ notifViewed: 1 });


const Match = mongoose.model("Matches", MatchesSchema);

module.exports = Match;