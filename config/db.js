import mongoose from "mongoose";

export const DBconnection=async()=>{
      await mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
       console.log(err,"error occured")
    })
}