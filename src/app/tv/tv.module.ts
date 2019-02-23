import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { ShowsComponent } from './shows/shows.component';
// import { MasterComponent } from '../theme/master/master.component';

@NgModule({
  declarations: [ShowsComponent],
  imports: [
    CommonModule,
    TvRoutingModule
  ]
})
export class TvModule { }
