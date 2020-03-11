import { Component } from '@angular/core';
import { MemeService } from '../meme.service';
import { MemeId } from 'src/app/shared/interfaces/meme';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  memes: MemeId[];
  constructor(private memeService: MemeService) {
    this.memeService.memes.subscribe(memes => {
      this.memes = memes;
      console.log(memes)
    });
  }
}
