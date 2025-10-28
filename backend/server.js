import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/Cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import bcrypt from 'bcryptjs';
// import router from './routes/AuthRouter.js';
import User from './models/UserModel.js';
import jwt from 'jsonwebtoken';


import multer from "multer";

dotenv.config();
console.log("ENV TEST:", process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);


//app config
const app = express()
const port = process.env.PORT || 4000
const SECRET_KEY = process.env.SECRET_KEY
const storage = multer.diskStorage({});
import {upload} from './middlewares/multer.js'
connectDB()
connectcloudinary()

//middlewares 
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.post("/add-doctor", upload.single("image"), (req, res) => { 
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  res.json( 'Doctor Added');
});

// app.use('/login',router);
// app.use('/register',router);
// app.use('/', authRouter);

//api endpoint
app.use('/api/admin',adminRouter)
// localhost:4000/api.admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API WORKING')
})


app.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists! You will be redirected to Log In" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword, role: "user"});

        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        console.log("LOGIN SUCCESSFUL FOR:", email);
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "5m" });

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Lax" })
            .json({ message: "Login Successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(port,()=> console.log("Server Started",port))