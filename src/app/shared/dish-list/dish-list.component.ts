import { Component, OnInit, Input } from '@angular/core';
import { ContextService } from '../context.service';
import { Dish } from "../dish";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit 
{
  isLoadingLocal: boolean = false;
  @Input() dishesArray: Dish[];

  constructor(private _contextService: ContextService) { }
  ngOnInit() 
  {
    //// does not trigger on initial render
    this._contextService.isLoading$
    .subscribe(
      isLoad => 
      {
        this.isLoadingLocal = isLoad
        //console.log('dish list: ', this.isLoadingLocal);
      }
    );
  }
}
