import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back2top',
  templateUrl: './back2top.component.html',
  styleUrls: ['./back2top.component.css']
})
export class Back2topComponent implements OnInit 
{
  constructor() { }
  ngOnInit() {
  }

  //// event handler

  topClickHandler()
  {
    window.scrollTo(
    {
      top: 0,
      behavior: 'smooth'
    });
  }
}
