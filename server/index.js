import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { register } from "./controllers/auth.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";
import User from "./models/User.js";
import { users,posts } from "./data/index.js";
import Post from "./models/Post.js";

//Dirname
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

//App
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(process.env.DB_STRING + "sociopediaDB")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // await User.insertMany(users);
  // await Post.insertMany(posts);


  //defualt

  app.get("/",(req,res)=>{
    res.json("hello world");
  })


// Image upload routes
app.post("/auth/register", upload.single("image"), register);
app.post("/post/createPost", upload.single("image"), createPost);


//auth Routes
app.use("/auth", authRoutes);

//user routes
app.use("/user", userRoutes);

//post routes
app.use("/post", postRoutes);
