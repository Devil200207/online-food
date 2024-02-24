import {Router} from "express";
import jwt from "jsonwebtoken"; 
import { sample_users } from "../data";
import asynceHandler from "express-async-handler";
import { MineUserModel } from "../models/user.modle";

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const usersCount = await MineUserModel.countDocuments();
        if(usersCount > 0) 
        {
            res.send("seed already done !");
            return;
        }
        
        await MineUserModel.create(sample_users);
        res.send("seeded successfully !");
    }
))

router.post("/login",asynceHandler(
    async (req, res) => {
        const {email,password} = req.body; //destructuring the email and password from the request body
        const user = await MineUserModel.findOne({email, password}); //find the user by email and password
     
        if(user){
            res.send(generateTokenResponce(user))
         }
         else
         {
             res.status(401).send({message: "Invalid email or password"});
         
         }
     }
))
 
 const generateTokenResponce = (user: any) => {
   const token = jwt.sign({ email:user.email,isAdmin:user.isAdmin }, "chinmay" ,{expiresIn: '30d'});//token will expire in one hour
   
   user.token = token;
   return user;
 }


 export default router;