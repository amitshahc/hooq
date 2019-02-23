import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';

@Component({
  selector: 'tv-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  // filter: string = '';
  shows = [];
  showsInit: any;
  // showList: boolean = false;
  status = { text: "Loading...", class: "alert-info" }
  urlImg: string;

  constructor(private service: TmdbService) {
    this.urlImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
  }

  ngOnInit() {
    this._getShows();
  }

  private _getShows() {
    this.service.getShows().subscribe(
      res => {
        this.showsInit = res;
        this.shows = this.showsInit.results;
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

}
