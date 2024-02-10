import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];
  constructor(private foodservice: FoodService) {
    this.foods = this.foodservice.getAll();
  }

  getStarClass(starIndex: number, rating: number): string {
    if (starIndex < rating) {
      return 'checked';
    } else {
      return 'unchecked';
    }
  }
}
