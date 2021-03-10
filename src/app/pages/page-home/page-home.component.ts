import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/context.service';
import { Dish } from "../../shared/dish";

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit 
{ 
  //// re-render whenever local variable value changes
  randomUrl: string = "https://www.themealdb.com/api/json/v1/1/random.php";
  randomDish: Dish;
  randomDishesArrayLocal: Dish[];
  isLoadingLocal: boolean = false;
  numOfRandomDishes: number = 4;

  constructor(private _contextService: ContextService) { }
  ngOnInit() 
  {
    //// always clone
    this.randomDishesArrayLocal = [...this._contextService.getRandomDishesArray()];
    //console.log('home: ', this.randomDishesArrayLocal.length);
    if (this.randomDishesArrayLocal.length < 1)
    {
      this.getRandomDishesArray();
    }
    this._contextService.setIsLinkToDetail(true);
  }

  getRandomDishesArray()
  {
    this.isLoadingLocal = true;
    this._contextService.setIsLoading(this.isLoadingLocal);
    for (let i = 0; i < this.numOfRandomDishes; i++)
    {
      this._contextService.getDishFromApi(this.randomUrl)
      .subscribe(
        response => 
        {
          //console.log('home: ', response['meals'][0]);
          this.randomDish = this._contextService.parseDataPreview(response['meals'][0]);
          this.randomDishesArrayLocal.push(this.randomDish);
          if (this.randomDishesArrayLocal.length === this.numOfRandomDishes)
          {
            this._contextService.setRandomDishesArray(this.randomDishesArrayLocal);
          }
        },
        error => console.log('Home page Error: ', error)
      );
    }
    this.isLoadingLocal = false;
    this._contextService.setIsLoading(this.isLoadingLocal);
  }

  //// event handler

  showClickHandler()
  {
    this.randomDishesArrayLocal = [];
    this.getRandomDishesArray();
    this._contextService.setIsLinkToDetail(true);
  }
}
