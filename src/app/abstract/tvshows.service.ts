import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from '../errors/notfound-error';
import { Unauthorized } from '../errors/unauthorized-error';
import { AppError } from '../errors/app-error';
import * as GLOBAL from '../globals';

// @Injectable({
//   providedIn: 'root'
// })

export class TvShows {

  private http: HttpClient;  
  
  constructor(@Inject(forwardRef(() => HttpClient)) http:HttpClient) {
    this.http = http;    
  }

  getShows(url : string){
    return this.http.get(url).pipe(
      map(response => { return response;}),
      catchError( error => this.handleError(error))
    )
  }

  getDetails(id : number, url: string){
    return this.http.get(url).pipe(
      map(response => { return response;}),
      catchError( error => this.handleError(error))
    )
  }

  // getAll(url? : string){
    
  //   url = url ? url : this.url;
    
  //   return this.http.get(url).pipe(
  //     map(response => { return response;}),
  //     catchError( error => this.handleError(error))
  //   )
  // }

  // getUser(uid, url? : string){
  //   url = url ? url : this.url;

  //   return this.http.get(url + "/" + uid)
  //   .pipe(
  //     retry(2),
  //     catchError( error => this.handleError(error))
  //   )
  // }

  // create(user, url? : string){  
  //   url = url ? url : this.url;
    
  //   return this.http.put(url, user).pipe(
  //     map(response => { return response;}),
  //     catchError( error => this.handleError(error))
  //   )
  // }

  // update(uid, data, url? : string){
  //   url = url ? url : this.url;

  //   return this.http.patch(url + '/'+ uid, data, { observe: "response"}).pipe(
  //     map(response => {
  //       // console.log('Headers', response.headers.keys());
  //       // console.log('Body', response.body);
  //       return response.body;
  //     }),
  //     retry(1),
  //     catchError( error => this.handleError(error))
  //   )
  // }

  private handleError(error: any) {    
    //console.log("handleError: ", error);
    if (error.status as number === GLOBAL.USER_NOT_FOUND) {      
      return throwError(new NotFoundError(error));
    }
    else if (error.status as number === GLOBAL.UNAUTHENTICATED) {      
      let e = new Unauthorized(error);      
      return throwError(e);
    }
    else {      
      return throwError(new AppError(error));
    }
  }
}
