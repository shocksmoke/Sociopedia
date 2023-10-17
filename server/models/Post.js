import mongoose from "mongoose";

const postScema= new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    },
    location: String,
    userPicturePath: String,
    description: String,
    likes: {
        type: Map,
        of: Boolean,
        default: {}
    },
    comments: [String]
});

export default mongoose.model('post',postScema);