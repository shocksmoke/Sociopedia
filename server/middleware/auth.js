import jwt from "jsonwebtoken";
import "dotenv/config";


export const verifyToken=async(req,res,next)=>{
    let token = req.headers.authorization; // Extract JWT from the 'Authorization' header
    token= token.slice(7)

    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.id= decoded._id;
        next();

    } catch (error) {

        console.error('JWT verification error:', error);
        res.status(400).json({message: "Access denied."});
      }
}