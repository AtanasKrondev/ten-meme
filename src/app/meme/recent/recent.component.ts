import { Component } from '@angular/core';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent {
  memes$;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes(ref => ref.orderBy('createdAt', 'desc'));
  }

}
