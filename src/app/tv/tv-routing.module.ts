import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowsComponent } from './shows/shows.component';

const routes: Routes = [
  {
    path: '',
    component: ShowsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvRoutingModule { }
