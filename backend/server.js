import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";                                          //these path & url will set the path
import { fileURLToPath } from "url";                              //to configure directories
import userRoutes from "./routes/users" 
import authRoutes from "./routes/auth"
import { register } from "./controllers/auth";  
import { verifyToken } from "./middleware/auth";

/* CONFIGURATION */

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();
const app =express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/assets",express.static(path.join(__dirname,'public/assets')));       //everything will be use or send from __dirname 


/*FILE STORAGE*/

const storage=multer.diskStorage(
    {
        destination:function(req,file,cb){   // uploaded files store in "public/assets"
            cb(null,"public/assets");
        },
        filename:function(req,file,cb){
            cb(null,file.originalname);
        }
    }
);

const upload=multer({storage});     //To upload file we will use upload variable


/*  ROUTES WITH FILES (cuntroller)*/
app.post("/auth/register",upload.single("picture"), verifyToken,register)

/* ROUTES */
app.use("/auth",authRoutes);
app.use("/users",userRoutes);


/* MONGOOSE SETUP */
const PORT= process.env.PORT || 8001;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=>console.log(`server port: ${PORT}`));
}).catch((error)=>console.log(`${error} did not work`))