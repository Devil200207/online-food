import {Router} from "express";
import { sample_food, sample_tags } from "../data";

const router = Router();

router.get("/", (req, res) => {
    res.send(sample_food);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_food.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

router.get("/tags", (req, res) => {
    res.send(sample_tags);
})

router.get("/tags/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = tagName === "All" ? sample_food : sample_food.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_food.find(food => food.id === foodId);
    res.send(food);
})

export default router;