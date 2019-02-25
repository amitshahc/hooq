import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tv',
    loadChildren: './tv/tv.module#TvModule'
  },
  {
    path: 'movies',
    loadChildren: './movies/movies.module#MoviesModule'
  },
  {
    path: '**',
    redirectTo: 'tv',
    // pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
