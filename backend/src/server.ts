import express from "express";
import cors from "cors";
import { sample_food, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"; 

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_food);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_food.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tags/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = tagName === "All" ? sample_food : sample_food.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_food.find(food => food.id === foodId);
    res.send(food);
})

app.post("/api/users/login", (req, res) => {
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

const port = 5000;
app.listen(port, () => {
    console.log("server is running on port", port);
})