import { Component } from '@angular/core';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-most-liked',
  templateUrl: './most-liked.component.html',
  styleUrls: ['./most-liked.component.scss']
})
export class MostLikedComponent {
  memes$;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes(ref => ref.orderBy('likes', 'desc'));
  }
}
