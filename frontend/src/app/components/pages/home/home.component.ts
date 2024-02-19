import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];
  constructor(private foodservice: FoodService,activateRoute:ActivatedRoute) {
    let foodObserable:Observable<Food[]>;
    activateRoute.params.subscribe(params => {
      if(params['searchterm'])
      {
        foodObserable = this.foodservice.getAllFoodBySearchTerm(params['searchterm']);
      }
      else if(params['tag'])
      {
        foodObserable = this.foodservice.getAllFoodByTag(params['tag']);
      }
      else
      {
        foodObserable = this.foodservice.getAll();
      }

      foodObserable.subscribe((foods:Food[]) => {
        this.foods = foods;
      });
    });
  }
}
