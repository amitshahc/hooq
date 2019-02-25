import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';
//import { SpinnerComponent } from '../../includes/spinner.component';
import * as GLOBAL from '../../globals';
import { isError } from 'util';
import { throwError } from 'rxjs';

@Component({
  selector: 'tv-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  // filter: string = '';
  shows = [];
  showsRes: any;
  isShowDetail: boolean = false;
  isLoading: boolean = true;
  showId: number;
  status = { text: "Loading...", class: "alert-info" }
  urlImg: string;
  currentPage: number = 1;
  isError: boolean = false;

  constructor(private service: TmdbService) {
    this.urlImg = GLOBAL.urlImage;
  }

  ngOnInit() {
    this._getShows();
  }

  private _getShows() {
    this.service.getShowsList(this.currentPage).subscribe(
      (res: any) => {
        this.showsRes = res;
        console.log('showsRes', this.showsRes);
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
    console.log(show);
    this.isError = show;
    if (error)
      this.status = { text: error, class: "alert-danger" };
  }

  showDetails(id) {
    this.isShowDetail = true;
    this.showId = id;
    console.log(id);
  }

  showsList() {
    this.isShowDetail = false;
    console.log('back to show list');
  }

  setCurrentPage(page: number) {
    console.log(page);
    this.currentPage = page;
    this.showSpinner(true);
    this._getShows();
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  ngAfterViewInit() {
    //this.isPageLoading = false;
  }

}
