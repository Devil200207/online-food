import express from "express";
import cors from "cors";
import { sample_food, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"; 
import foodRouter from './routers/food.router';
import loginRouter from './routers/user.router';

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/foods",foodRouter);
app.use("/api/users",loginRouter);


const port = 5000;
app.listen(port, () => {
    console.log("server is running on port", port);
})