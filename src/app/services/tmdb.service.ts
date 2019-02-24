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
    this.getShows();
  }

  getShows() {
    this.urlDiscover +=  this.paramApiKey + '&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false';
    return super.getShows(this.urlDiscover);
  }

  getShowDetails(id: number) {
    this.urlShowDetails +=  '/' + id + this.paramApiKey + '&language=en-US';
    return super.getDetails(id, this.urlShowDetails);
  }
  // getAll() {
  //   return super.getAll("http://demo1601932.mockable.io/customers/get");
  // }

  // get(uid) {
  //   return super.getUser(uid, "http://demo1601932.mockable.io/customer/get");
  // }

  // create(user) {
  //   return super.create(user, "http://demo1601932.mockable.io/customers");
  // }

  // update(uid, userData) {
  //   return super.update(uid, userData, "http://demo1601932.mockable.io/customers");
  // }

  // //Admin
  // getall4Admin() {
  //   return super.getAll("https://jsonplaceholder.typicode.com/users");
  // }

  // get4Admin(uid) {
  //   return super.getUser(uid, "https://jsonplaceholder.typicode.com/users");
  // }
}
