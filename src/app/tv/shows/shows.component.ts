import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';
//import { SpinnerComponent } from '../../includes/spinner.component';
import * as GLOBAL from '../../globals';
import { isError } from 'util';
import { throwError } from 'rxjs';
import { $ } from 'protractor';

@Component({
  selector: 'tv-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  // filter: string = '';
  //@Output() clickedDetails = new EventEmitter<boolean>();
  shows = [];
  showsRes: any;
  isShowDetail: boolean = false;
  isLoading: boolean = true;
  showId: number;
  status = { text: "Loading...", class: "alert-info" }
  urlImg: string;
  currentPage: number = 1;
  isError: boolean = false;
  query : string = null;

  constructor(private service: TmdbService) {
    this.urlImg = GLOBAL.urlImage;
  }

  ngOnInit() {
    this._getShows();
  }

  private _getShows(query?: string) {
    
    this.showSpinner(true);
    
    this.service.getShowsList(this.currentPage, query).subscribe(
      (res: any) => {
        this.showsRes = res;
        //console.log('showsRes', this.showsRes);
        this.shows = this.showsRes.results;
        this.showError(false);
        this.showSpinner(false);
      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.status.text = "Resource not found.";
          this.status.class = "alert-danger";
        }
        else {
          this.status.text = "Application error occured.";
          this.status.class = "alert-danger";
          this.showError(true);
          this.showSpinner(false);
        }
      });
  }

  showSpinner(show: boolean) {
    this.isLoading = show;
  }

  showError(show: boolean, error?) {
    this.isError = show;
    if (error)
      this.status = { text: error, class: "alert-danger" };
  }

  showDetails(id) {
    this.isShowDetail = true;
    this.showId = id;
  }

  showsList() {
    this.isShowDetail = false;
  }

  setCurrentPage(page: number, query?: string) {
    this.currentPage = page;
    //this.showSpinner(true);
    this._getShows(this.query ? this.query : null);
  }

  searchTv(query?: string) {
    this.query = query || null;
    this.setCurrentPage(1);    
    this._getShows(this.query);
  }

  ngOnDestroy() {
    //console.log('destroy');
  }

  ngAfterViewChecked() {
    document.getElementById('top-section').style.display = this.isShowDetail ? 'none' : '';
  }

}
