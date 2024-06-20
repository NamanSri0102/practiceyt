
import { DB_NAME } from "./constants.js";
import dbConnect from "./db/dbconnect.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})
 
dbConnect();



 



























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