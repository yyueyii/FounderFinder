const mongoose = require("mongoose");

const ProfileDataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    picture:String, 
    description: String, 
    sectors:[String],
    skills:[String],
    education:[{
        institution: String,
        duration: String,
        description: String
    }],
    workExperience:[{
        organisation: String, 
        duration: String,
        description: String,
    }],
    LCI:String,
})

const UserDetailSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    draftProfile:ProfileDataSchema,
    publishedProfile: {...ProfileDataSchema.obj,
        published_at: { type:Date, default:Date.now }
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
}, 

{
    collection: "UserInfo",
});



mongoose.model("UserInfo", UserDetailSchema);
