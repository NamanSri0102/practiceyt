import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app =express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true 
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,
    limit:"16kb"
}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRouter from './router/user.router.js'

// routes decleration

app.use("/api/v1/users",userRouter);

export {app};