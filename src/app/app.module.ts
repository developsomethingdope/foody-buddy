//// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

//// service
import { ContextService } from "./shared/context.service";
//// component
import { AppComponent } from './app.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { NavlinksComponent } from './shared/navlinks/navlinks.component';
import { PageAboutComponent } from './pages/page-about/page-about.component';
import { PageFavoriteComponent } from './pages/page-favorite/page-favorite.component';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { DishListComponent } from './shared/dish-list/dish-list.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DishItemComponent } from './shared/dish-item/dish-item.component';
import { PageDishDetailComponent } from './pages/page-dish-detail/page-dish-detail.component';
import { Back2topComponent } from './shared/back2top/back2top.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    NavlinksComponent,
    PageAboutComponent,
    PageFavoriteComponent,
    DishListComponent,
    LoadingComponent,
    DishItemComponent,
    PageDishDetailComponent,
    Back2topComponent,
	PageErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ContextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
