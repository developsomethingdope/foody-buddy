import { Component, OnInit, Input } from '@angular/core';
import { Dish } from "../dish";
import { ContextService } from '../context.service';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit 
{
  isFavoriteLocal: boolean;
  isLinkToDetailLocal: boolean;
  //favoriteIdArrayLocal: string[];
  @Input() dishInput: Dish;
  
  constructor(private _contextService: ContextService) { }
  ngOnInit() 
  {
    this.isFavoriteLocal = this.dishInput.IsFavorite;
    this.isLinkToDetailLocal = this._contextService.getIsLinkToDetail();
    //this.favoriteIdArrayLocal = this._contextService.getLocalStorageIdsArray();
  }

  //// event handler

  toggleChangeHandler()
  {
    let favoriteIdArrayLocal = [...this._contextService.getLocalStorageIdsArray()];
    if (this.isFavoriteLocal)
    {
      favoriteIdArrayLocal = this._contextService.getLocalStorageIdsArray().filter(idItem => idItem !== this.dishInput.Id);
    }
    else
    {
      favoriteIdArrayLocal.push(this.dishInput.Id);
    }
    //console.log('item: input ' + this.dishInput.Id);

    const randomArrayLocal = [...this._contextService.getRandomDishesArray()];
    for (const randomItem of randomArrayLocal)
    {
      if (randomItem.Id === this.dishInput.Id)
      {
        randomItem.IsFavorite = !this.isFavoriteLocal;
      }
    }
    this._contextService.setRandomDishesArray(randomArrayLocal);
    this._contextService.setLocalStorageIdsArray(favoriteIdArrayLocal);
    localStorage.setItem(this._contextService.getLocalStorageKey(), JSON.stringify(favoriteIdArrayLocal));
    this._contextService.setIsIdsArrayChanged(true);
    // re-render trigger
    this.isFavoriteLocal = !this.isFavoriteLocal;
  }
}
