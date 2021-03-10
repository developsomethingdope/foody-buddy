import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/context.service';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.css']
})
export class PageAboutComponent implements OnInit 
{
  currentYear: number = (new Date()).getFullYear();
  isFavoriteAboutLocal: boolean;

  constructor(private _contextService: ContextService) { }
  ngOnInit() 
  {
    this.isFavoriteAboutLocal = this._contextService.getIsFavoriteAbout();
  }

  //// event handler

  toggleChangeHandler()
  {
    this.isFavoriteAboutLocal = !this.isFavoriteAboutLocal
    this._contextService.setIsFavoriteAbout(this.isFavoriteAboutLocal);
  }
}
