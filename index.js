import express from 'express'
import cors from 'cors'
import dotenv from  "dotenv";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
const app=express()

dotenv.config()

app.use(cors())
app.use(session({
  secret:process.env.SESSION_SECRET_KEY, // Replace with a secure key
  resave: false,              // Do not save session if unmodified
  saveUninitialized: false,   // Do not create session until something stored
  cookie: { secure: false }   // Set to true if using HTTPS
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/user',userRouter)


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})

app.set('view engine', 'ejs')