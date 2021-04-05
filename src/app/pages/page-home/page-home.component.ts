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

  async getRandomDishesArray()
  {
    try
    {
      var idsObject = {};
      for (let i = 0; i < this.numOfRandomDishes; i++)
      {
        let idLocal = '';
        var dataJson = null;
        do
        {
          const response = await fetch(this.randomUrl);
          dataJson = await response.json();
          idLocal = dataJson['meals'][0]['idMeal'];
        } while (idsObject[idLocal]);
        idsObject[idLocal] = true;
        this.randomDish = this._contextService.parseDataPreview(dataJson['meals'][0]);
        this.randomDishesArrayLocal.push(this.randomDish);
      }
      this._contextService.setRandomDishesArray(this.randomDishesArrayLocal);
    }
    catch(error)
    {
      console.log('home page: ', error);
    }
  }

  //// event handler

  showClickHandler()
  {
    this.randomDishesArrayLocal = [];
    this.getRandomDishesArray();
    this._contextService.setIsLinkToDetail(true);
  }
}
