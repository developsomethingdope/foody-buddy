import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navlinks',
  templateUrl: './navlinks.component.html',
  styleUrls: ['./navlinks.component.css']
})
export class NavlinksComponent implements OnInit 
{
  @Input() linkType: string;
  
  constructor() { }
  ngOnInit() {
  }
}
