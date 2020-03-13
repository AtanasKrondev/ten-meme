import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  memeId: string;
  // meme: MemeId;
  meme;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private memeService: MemeService, ) {
    this.memeId = this.activatedRoute.snapshot.params.id;
    this.memeService.getMemeById(this.memeId).subscribe(meme => {
      this.meme = meme;
      console.log(this.meme)
    });

  }

  goBack() {
    this._location.back();
  }
}
