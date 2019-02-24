import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { NotFoundError } from '../../errors/notfound-error';
import { AppError } from '../../errors/app-error';

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
  private status = { text: "Loading...", class: "alert-info" }

  constructor(private service: TmdbService) { }

  ngOnInit() {
    this._getShowDetails();
  }

  private _getShowDetails() {
    this.service.getShowDetails(this.showId).subscribe(
      res => {
        this.showDetails = res;
        console.table(this.showDetails);
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
}
