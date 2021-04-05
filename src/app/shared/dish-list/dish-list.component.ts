import { Component, OnInit, Input } from '@angular/core';
import { Dish } from "../dish";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit 
{
  @Input() dishesArray: Dish[];

  constructor() { }
  ngOnInit() {
  }
}
