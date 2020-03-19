import { Component, Input } from '@angular/core';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() meme: MemeId;
  @Input() user: User;

  constructor(private userService: UserService) { }

  like(id: string) {
    this.userService.pushToIdArray(id, 'likes');
  }

  unLike(id: string) {
    this.userService.removeFromIdArray(id, 'likes');
  }

  favorite(id: string) {
    this.userService.pushToIdArray(id, 'favorites');
  }

  unFavorite(id: string) {
    this.userService.removeFromIdArray(id, 'favorites');
  }
}
