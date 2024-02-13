import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_food, sample_tags } from 'src/data';
import { Tag } from '../shared/models/tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]
  {
    return sample_food;
  }

  getAllFoodBySearchTerm(searchterm:string)
  {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchterm.toLowerCase()));
  }

  getAlltags():Tag[]
  {
    return sample_tags
  }

  getAllFoodByTag(tag:string):Food[]
  {
    return tag == "All" ?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(FoodId:string):Food
  {
    return this.getAll().find(food => food.id == FoodId) ?? new Food(); // ?? is the nullish coalescing operator
  }
}
