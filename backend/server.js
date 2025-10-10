import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/Cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import multer from "multer";

dotenv.config();
console.log("ENV TEST:", process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);


//app config
const app = express()
const port = process.env.PORT || 4000
const storage = multer.diskStorage({});
import {upload} from './middlewares/multer.js'
connectDB()
connectcloudinary()

//middlewares 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/add-doctor", upload.single("image"), (req, res) => { 
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  res.json( 'Doctor Added');
});


//api endpoint
app.use('/api/admin',adminRouter)
// localhost:4000/api.admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=> console.log("Server Started",port))