import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TvRoutingModule } from './tv-routing.module';
import { ShowsComponent } from './shows/shows.component';
import { TmdbService } from '../services/tmdb.service';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [ShowsComponent, ShowComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    HttpClientModule
  ],
  providers:[
    TmdbService
  ]
})
export class TvModule { }
