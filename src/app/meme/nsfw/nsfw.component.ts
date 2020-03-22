import { Component } from '@angular/core';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-nsfw',
  templateUrl: './nsfw.component.html',
  styleUrls: ['./nsfw.component.scss']
})
export class NsfwComponent {
  memes$;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes(ref => ref.where('nsfw', '==', true));
  }
}
