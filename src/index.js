

import dbConnect from "./db/dbconnect.js";
import dotenv from 'dotenv'
import {app} from './app.js'

dotenv.config({
    path: './env'
})
 
dbConnect()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server listening at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed!", err);
})



 



























/*
import {DB_NAME} from "./constants.js"
import express from 'express';
const app= express();
(async()=>{
try {
    mongoose.connect(`${process.env.MONGO_URI}/${srivastavatobu}`)
    app.on("error",(error)=>{
        console.log("error: ",error);
        throw error;
    })
    app.listen(process.env.PORT,()=>{
        console.log(`listening on ${process.env.PORT}`)
    })
} catch (error) {
    console.error("Error",error);
    throw error
}
})()

*/