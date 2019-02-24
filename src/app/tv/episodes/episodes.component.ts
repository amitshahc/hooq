import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';
import * as GLOBAL from '../../globals';

@Component({
  selector: 'tv-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  @Input('seasonNumber') season: number;
  @Input('showId') showId: number;
  private episodes: any;
  private episodesLoaded : boolean = false;
  private status = { text: "Loading...", class: "alert-info" };

  constructor(private service: TmdbService) { }

  ngOnChanges(){
    this._getShowDetails();
  }

  ngOnInit() {
  }

  private _getShowDetails() {    
    this.service.getEpisodes(this.showId, this.season).subscribe(
      res => {
        this.episodes = res.episodes;        
        this.episodesLoaded = true;
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

}
