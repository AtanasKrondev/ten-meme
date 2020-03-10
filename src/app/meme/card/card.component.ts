import { Component, Input } from '@angular/core';
import { MemeId } from 'src/app/shared/interfaces/meme';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() meme: MemeId;
}
