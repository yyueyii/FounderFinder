const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    pic: {
        type: "String",
        required: true,
        default: "",
      },
      name: {
        type: "String",
        default: "",
      },
      description: {
        type: "String",
        default: "",
      },
      skills: {
        type:["String"],
        default: [],
      },
      sectors: {
        type:["String"],
        default: [],
      },
      aboutMe: {
        type:"String",
        default:""
      },
      education: {
        type: [
            {
                institution: {type: "String", default:""},
                duration: {type: "String", default:""},
                description: {type: "String", default:""}
            }],
        default: [],
      },
      workExperience: {
        type: [
        {
            organisation: {type: "String", default:""},
            duration: {type: "String", default:""},
            description: {type: "String", default:""}
        }],
        
        default: [],
      },
      LCI: {
        type:"String",
        default:"",
      }, 
      matches: [
        {
            userId: { type:mongoose.Schema.Types.ObjectId, ref: 'UserInfo'},
            matchedAt: { type: Date, default: Date.now }
        }
    ]
}, 
{
    timestamps: true,
    collection: "UserInfo"
});
const User = mongoose.model("UserInfo", UserDetailSchema);

module.exports = User;
