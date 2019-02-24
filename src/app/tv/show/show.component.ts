import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';
import * as GLOBAL from '../../globals';

@Component({
  selector: 'tv-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

  @Input() showId: number;
  @Output() clickedBack = new EventEmitter<boolean>();
  private btnBackClick: boolean = false;
  private showDetails: any;
  private status = { text: "Loading...", class: "alert-info" };
  private urlImg : string;
  private showDetailsLoaded: boolean = false;

  constructor(private service: TmdbService) { 
    this.urlImg = GLOBAL.urlImage;
  }

  ngOnChanges(){
    console.log('onchange', this.showId);
    this.showDetailsLoaded = false;
    this.showDetails = null;
    this._getShowDetails();
  }

  ngOnInit() {
    //this._getShowDetails();
  }

  private _getShowDetails() {
    console.log('getshowdetails',this.showId);
    this.service.getShowDetails(this.showId).subscribe(
      res => {
        this.showDetails = res;
        this._setTotalEpisodes();
        this.showDetailsLoaded = true;
        console.log(res);
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

  backtoShows() {
    console.log('back');
    this.btnBackClick = true;
    this.clickedBack.emit(this.btnBackClick);
  }

  private _setTotalEpisodes(){
    let seasons = this.showDetails.seasons;
    let episodes = seasons.reduce((total, current, index, src) => total + current.episode_count, 0);
    this.showDetails.totalEpisodes = episodes;
  }


}
