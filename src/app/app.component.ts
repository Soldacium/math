import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'math';
  isShowingRouteLoadIndicator = true;
  constructor(router: Router){
    this.isShowingRouteLoadIndicator = false;


    let asyncLoadCount = 0;
    router.events.subscribe((event: Event ) =>{
      if ( event instanceof RouteConfigLoadStart ) {
        asyncLoadCount++;
      } else if ( event instanceof RouteConfigLoadEnd ) {
        asyncLoadCount--;
      }
      this.isShowingRouteLoadIndicator = !! asyncLoadCount;
    });
  }
}

