import  express from "express"
import { addDoctor } from '../controllers/adminController.js'
import {upload} from "../middlewares/multer.js"
import multer from "multer";

const adminRouter = express.Router()



adminRouter.post('/add-doctor', upload.single('image'), addDoctor )
// adminRouter.post('/add-doctor', upload.single('image'),addDoctor)


export default adminRouter
