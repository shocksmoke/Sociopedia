import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{firstName: String,lastName: String, picturePath: String, occupation: String, location: String}],
    picturePath: String,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
});


export default mongoose.model('user',userSchema);