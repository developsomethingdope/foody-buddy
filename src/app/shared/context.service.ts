import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Dish } from "./dish";

@Injectable({
  providedIn: 'root'
})
export class ContextService 
{
  private _isLoadingSource = new Subject<boolean>();
  isLoading$ = this._isLoadingSource.asObservable();
  randomDishesArray: Dish[] = [];
  isFavoriteAbout: boolean = false;
  isLinkToDetail: boolean = false;
  local_storage_key: string = 'foody-buddy-app-id-array';
  localStorageIdsArray: string[] = JSON.parse(localStorage.getItem(this.local_storage_key)) || [];
  isIdsArrayChanged: boolean = true;
  favoriteDishesArray: Dish[] = [];

  //// make sure that modules are declared in app.module
  constructor(private _http: HttpClient) { }

  //// global variables
  
  setIsLoading(isLoad: boolean)
  {
    this._isLoadingSource.next(isLoad);
  }

  getRandomDishesArray()
  {
    return this.randomDishesArray;
  }
  setRandomDishesArray(newRandomDishesArray)
  {
    this.randomDishesArray = newRandomDishesArray;
  }

  getIsFavoriteAbout()
  {
    return this.isFavoriteAbout;
  }
  setIsFavoriteAbout(newIsFavoriteAbout)
  {
    this.isFavoriteAbout = newIsFavoriteAbout;
  }

  getIsLinkToDetail()
  {
    return this.isLinkToDetail;
  }
  setIsLinkToDetail(newIsLinkToDetail)
  {
    this.isLinkToDetail = newIsLinkToDetail;
  }

  getLocalStorageKey()
  {
    return this.local_storage_key;
  }
  
  getLocalStorageIdsArray()
  {
    return this.localStorageIdsArray;
  }
  setLocalStorageIdsArray(newLocalStorageIdsArray)
  {
    this.localStorageIdsArray = newLocalStorageIdsArray;
  }

  getIsIdsArrayChanged()
  {
    return this.isIdsArrayChanged;
  }
  setIsIdsArrayChanged(newIsIdArrayChanged)
  {
    this.isIdsArrayChanged = newIsIdArrayChanged;
  }

  getFavoriteDishesArray()
  {
    return this.favoriteDishesArray;
  }
  setFavoriteDishesArray(newFavoriteDishesArray)
  {
    this.favoriteDishesArray = newFavoriteDishesArray;
  }

  //// global functions
  
  getDishFromApi(url: string)
  {
    return this._http.get(url);
  }

  parseDataPreview(dataDish)
  {
    let isFavoriteLocal = false;
    for (const idItem of this.localStorageIdsArray)
    {
      if (idItem === dataDish.idMeal)
      {
        isFavoriteLocal = true;
        break;
      }
    }
    
    //console.log('context: ' + dataDish.idMeal);
    const newDish = 
    {
      Id: dataDish.idMeal,
      Name: dataDish.strMeal,
      Area: '',
      Category: '',
      Ingredients: '',
      Instructions: [],
      Image: dataDish.strMealThumb,
      IsFavorite: isFavoriteLocal
    }
    return newDish;
  }
}
