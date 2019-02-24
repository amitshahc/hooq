import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';
//import { SpinnerComponent } from '../../includes/spinner.component';
import * as GLOBAL from '../../globals';

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
  isShowsResLoaded: boolean = false;
  isPageLoading: boolean = true;
  showId: number;
  status = { text: "Loading...", class: "alert-info" }
  urlImg: string;
  currentPage: number = 1;

  constructor(private service: TmdbService) {
    this.urlImg = GLOBAL.urlImage;
  }

  ngOnInit() {
    this._getShows();
  }

  private _getShows() {
    this.service.getShowsList(this.currentPage).subscribe(
      res => {
        this.showsRes = res;
        this.shows = this.showsRes.results;
        this.isShowsResLoaded = true;
        console.log('showsRes', this.showsRes);
        //this.showList = true;
      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.status.text = "Resource not found.";
          this.status.class = "alert-danger";
        }
        else {
          this.status.text = "Application error occured.";
          this.status.class = "alert-danger";
        }
      });
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
    this.currentPage = page;
    this.isShowsResLoaded = false;
    this._getShows();
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  ngAfterViewInit(){
    this.isPageLoading = false;
  }

}
