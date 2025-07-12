import express from 'express';
import './types/express-extend';
import mongodb from 'mongoose';
import router from './routers/auth.routes'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from './libs/db';
import { generateToken } from './libs/utils';


const app = express();
const port = process.env.PORT;

dotenv.config()
app.use(express.json());
app.use(cookieParser());
connectDB();


app.use('/',router);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
