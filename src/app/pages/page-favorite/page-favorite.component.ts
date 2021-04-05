import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/context.service';
import { Dish } from "../../shared/dish";

@Component({
  selector: 'app-page-favorite',
  templateUrl: './page-favorite.component.html',
  styleUrls: ['./page-favorite.component.css']
})
export class PageFavoriteComponent implements OnInit 
{
  partialUrl: string = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  favoriteIdArrayLocal: string[];
  favoriteDishesArrayLocal: Dish[];

  constructor(private _contextService: ContextService) { }
  ngOnInit() 
  {
    this.favoriteDishesArrayLocal = this._contextService.getFavoriteDishesArray();
    this.favoriteIdArrayLocal = this._contextService.getLocalStorageIdsArray();
    //console.log('favorite: ', this.favoriteIdArrayLocal);
    if (this.favoriteIdArrayLocal.length > 0 && this._contextService.getIsIdsArrayChanged())
    {
      this.favoriteDishesArrayLocal = [];
      this.getFavoriteDishesArray();
      this._contextService.setIsIdsArrayChanged(false);
    }
    this._contextService.setIsLinkToDetail(true);
  }

  getFavoriteDishesArray()
  {
    for (const idItem of this.favoriteIdArrayLocal)
    {
      const url = this.partialUrl + idItem;
      this._contextService.getDishFromApi(url)
      .subscribe(
        response => 
        {
          //console.log('favorite: ', response['meals'][0]);
          const favoriteDish = this._contextService.parseDataPreview(response['meals'][0]);
          this.favoriteDishesArrayLocal.push(favoriteDish);
          //console.log('favorite: push', favoriteDish.Id);
          if (this.favoriteDishesArrayLocal.length === this.favoriteIdArrayLocal.length)
          {
            //// match order of dishes array with that of id array
            this.favoriteDishesArrayLocal = this.matchIdArrayOrder(this.favoriteDishesArrayLocal);
            this._contextService.setFavoriteDishesArray(this.favoriteDishesArrayLocal);
          }
        },
        error => console.log('Favorite page Error: ', error)
      );
    }
  }

  matchIdArrayOrder(dishesArray)
  {
    const newDishesArray = [];
    for (let i = 0; i < this.favoriteIdArrayLocal.length; i++)
    {
      for (const dishItem of dishesArray)
      {
        if (dishItem.Id === this.favoriteIdArrayLocal[i])
        {
          newDishesArray.push(dishItem);
          break;
        }
      }
    }

    return newDishesArray;
  }
}
