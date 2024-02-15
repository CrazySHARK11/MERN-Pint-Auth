import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRouter } from './routes/file.js' 
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
 
dotenv.config()
const app = express()
 
const corsOpts = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
};

app.use(cors(corsOpts));
app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello")
})
 
mongoose.connect("mongodb://localhost:27017/authentication")

app.use('/auth', UserRouter)

app.listen(process.env.PORT, ()=>{
    console.log('server is running')
})