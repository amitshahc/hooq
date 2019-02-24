import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShows } from '../abstract/tvshows.service';
import * as GLOBAL from '../globals';

@Injectable({
  providedIn: 'root'
})

export class TmdbService extends TvShows {

  private url: string = "https://api.themoviedb.org/3/";
  private paramApiKey: string;
  private urlDiscover: string = this.url + 'discover/tv';
  private urlShowDetails: string = this.url + 'tv';

  constructor(http: HttpClient) {
    super(http);
    this.paramApiKey = '?api_key=' + GLOBAL.TMDB_API_KEY;
    //this.getShows();
  }

  getShowsList(page: Number) {
    let url = this.urlDiscover + this.paramApiKey + '&page=' + page + '&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false';
    return super.getShows(url);
  }

  getShowDetails(id: number) {
    let url = this.urlShowDetails + '/' + id + this.paramApiKey + '&language=en-US';
    return super.getDetails(id, url);
  }
}
