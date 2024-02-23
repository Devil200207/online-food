import {Router} from "express";
import jwt from "jsonwebtoken"; 
import { sample_users } from "../data";

const router = Router();

router.post("/login", (req, res) => {
    const {email,password} = req.body; //destructuring the email and password from the request body
    const user = sample_users.find(user => user.email === email && user.password === password);
 
    if(user){
        res.send(generateTokenResponce(user))
     }
     else
     {
         res.status(401).send({message: "Invalid email or password"});
     
     }
 })
 
 const generateTokenResponce = (user: any) => {
   const token = jwt.sign({ email:user.email,isAdmin:user.isAdmin }, "chinmay" ,{expiresIn: '30d'});//token will expire in one hour
   
   user.token = token;
   return user;
 }


 export default router;