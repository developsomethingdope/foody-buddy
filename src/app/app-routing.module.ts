import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { PageAboutComponent } from './pages/page-about/page-about.component';
import { PageFavoriteComponent } from './pages/page-favorite/page-favorite.component';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { PageDishDetailComponent } from './pages/page-dish-detail/page-dish-detail.component';

//// error page cannot be reached for invalid url of same domain
//// unless server has some way like htaccess to redirect the url
const routes: Routes = 
[
  {path: 'about', component: PageAboutComponent},
  {path: 'favorite', component: PageFavoriteComponent},
  {path: 'dish/:id', component: PageDishDetailComponent},
  {path: '', component: PageHomeComponent, pathMatch:'full'},
  {path: '**', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
