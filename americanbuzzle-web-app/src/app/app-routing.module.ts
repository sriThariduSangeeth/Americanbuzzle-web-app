import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {HomepageComponent} from './homepage/homepage.component';
import {CategorypageComponent} from './categorypage/categorypage.component';
import {LatestpageComponent} from './latestpage/latestpage.component';
import {SearchpageComponent} from './searchpage/searchpage.component';

const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'category', component: CategorypageComponent},
  {path:'latest', component: LatestpageComponent},
  {path:'search', component: SearchpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
