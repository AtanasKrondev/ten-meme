import { Component, Input } from '@angular/core';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() meme: MemeId;

  constructor(private userService: UserService) { }

  like(id: string) {
    this.userService.pushMeme(id, 'likes');
  }

  favorite(id: string) {
    this.userService.pushMeme(id, 'favorites');
  }
}
