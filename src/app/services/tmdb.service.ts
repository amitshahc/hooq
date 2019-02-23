import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvShows } from '../abstract/tvshows.service';
import * as GLOBAL from '../globals';

@Injectable({
  providedIn: 'root'
})

export class TmdbService extends TvShows {

  urlDiscover: string = "https://api.themoviedb.org/3/discover/tv?";

  constructor(http: HttpClient) {
    super(http);
    this.urlDiscover += 'api_key=' + GLOBAL.TMDB_API_KEY;
    this.urlDiscover += '&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false';
    this.getShows();
  }

  getShows() {
    return super.getShows(this.urlDiscover);
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
