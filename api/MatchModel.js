const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema ({
    user1: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    matched: {
        type: "Boolean",
        default: false,
    }, 
    },
    {
        timestamps: true,
        collection:"Matches",
    }

);

const Match = mongoose.model("Matches", MatchesSchema);

module.exports = Match;
