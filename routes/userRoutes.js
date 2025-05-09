import express from 'express'
import { userSignup,getsessionUser } from "../controllers/userController.js";


const userRouter=express.Router();


userRouter.post('/signup',userSignup)
userRouter.get('/sessionuser',getsessionUser)


export default userRouter

