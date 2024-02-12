import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];
  constructor(private foodservice: FoodService,activateRoute:ActivatedRoute) {
    activateRoute.params.subscribe(params => {
      if(params['searchterm'])
      {
        this.foods = this.foodservice.getAllFoodBySearchTerm(params['searchterm']);
      }
      else if(params['tag'])
      {
        this.foods = this.foodservice.getAllFoodByTag(params['tag']);
      }
      else
      {
        this.foods = this.foodservice.getAll();
      }
    });
  }
}
