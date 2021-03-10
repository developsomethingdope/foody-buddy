import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContextService } from 'src/app/shared/context.service';
import { Dish } from "../../shared/dish";

@Component({
  selector: 'app-page-dish-detail',
  templateUrl: './page-dish-detail.component.html',
  styleUrls: ['./page-dish-detail.component.css']
})
export class PageDishDetailComponent implements OnInit 
{
  idLocal: string;
  isLoadingLocal: boolean = true;
  partialUrl: string = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  dishItem: Dish;
  
  constructor(private _activatedRoute: ActivatedRoute, private _contextService: ContextService) { }
  ngOnInit() 
  {
    this._activatedRoute.paramMap.subscribe(
      paramMap => 
      {
        //console.log(paramMap['params']);
        this.idLocal = paramMap['params'].id;
      }
    );
    this.getDishDetail(this.idLocal);
    this._contextService.setIsLinkToDetail(false);
  }

  getDishDetail(dishId)
  {
    const url = this.partialUrl + dishId;
    this._contextService.getDishFromApi(url)
    .subscribe(
      response =>
      {
        //console.log('detail: ', response['meals'][0]);
        this.dishItem = this.parseData(response['meals'][0]);
        this.isLoadingLocal = false;
      },
      error => console.log('Detail page Error: ', error)
    );
  }

  parseData(dataDish)
  {
    const favoriteIdsArray = [...this._contextService.getLocalStorageIdsArray()];
    let isFavoriteLocal = false;
    for (const idItem of favoriteIdsArray)
    {
      if (idItem === dataDish.idMeal)
      {
        isFavoriteLocal = true;
        break;
      }
    }
    let ingredientArray = [];
    let measurementArray = [];
    for (const [key, value] of Object.entries(dataDish))
    {
      if (key.includes('strIngredient') && value)
      {
        ingredientArray.push(value);
      }
      else if (key.includes('strMeasure') && value)
      {
        let measureText = ('' + value).trim();
        if (measureText)
        {
          measurementArray.push(measureText);
        }
      }
    }
    //console.log('detail: ', ingredientArray);
    //console.log('detail: ', measurementArray);
    let ingredientsString = '';
    for (let i = 0; i < ingredientArray.length; i++)
    {
      if (i === 0)
      {
        ingredientsString = measurementArray[i] + ' ' + ingredientArray[i];
      }
      else
      {
        ingredientsString = ingredientsString + ', ' + measurementArray[i] + ' ' + ingredientArray[i];
      }
    }
    //console.log('detail: ' + ingredientsString);
    let instructionsArray;
    instructionsArray = dataDish.strInstructions.split('\n\r');
    if (dataDish.strInstructions.includes('\n\r'))
    {
      instructionsArray = dataDish.strInstructions.split('\n\r');
    }
    //else if (dataDish.strInstructions.includes('\r\n'))
    else
    {
      instructionsArray = dataDish.strInstructions.split('\r\n');
    }
    const newDish = 
    {
      Id: dataDish.idMeal,
      Name: dataDish.strMeal,
      Area: dataDish.strArea,
      Category: dataDish.strCategory,
      Ingredients: ingredientsString,
      Instructions: instructionsArray,
      Image: dataDish.strMealThumb,
      IsFavorite: isFavoriteLocal
    }

    return newDish;
  }
}
