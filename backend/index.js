import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


const connect = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/mydb');


        console.log('MongoDb Database connected')
    }
    catch {
        console.log("connection failed");

    }
}


app.get("/", (req, res) => {
    res.send('api is working');
});
app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.listen(port, () => {
    connect();
    console.log('server is listening on port', port);
})