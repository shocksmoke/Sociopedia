import Post from "../models/Post.js";
import User from "../models/User.js";


export const getAllPosts= async(req,res)=>{
    const allPosts= await Post.find();

    res.status(200).json(allPosts);
}


export const getUserPosts=async(req,res)=>{
    const userId= req.body.id;

    const allPosts= await Post.find();

    const userPosts= allPosts.filter((post)=> post.userId==userId);

    res.status(200).json(userPosts);
}

export const likePost= async(req,res)=>{
    const userId= req.body.userId;
    const postId= req.body.postId;


    let post= await Post.findById(postId);

    if(post.likes.has(userId)){
        post.likes.delete(userId);
    }else{
        post.likes.set(userId,true);
    }

    await post.save();

    res.status(200).json(post);
}


export const createPost= async(req,res)=>{

    const {
        userId,
        location,
        description,
    }= req.body;

    let picturePath= req.file.filename;

    const user= await User.findById(userId);

    let post= new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        picturePath,
        location,
        userPicturePath: user.picturePath,
        description
    });

    await post.save();

    let posts= await Post.find();

    res.status(200).json(posts);
}


export const comment= async(req,res)=>{
    const comment= req.body.comment;
    const postId= req.body.postId;

    let post= await Post.findById(postId);

    post.comments.push(comment);

    await post.save();

    res.status(200).json(post);
}