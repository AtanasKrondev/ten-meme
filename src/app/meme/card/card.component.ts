import { Component, Input } from '@angular/core';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { UserService } from 'src/app/user/user.service';
import { MemeService } from 'src/app/meme/meme.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() meme: MemeId;
  @Input() user: User;

  constructor(private userService: UserService, private memeService: MemeService) { }

  like(id: string): void {
    this.userService.pushToIdArray(id, 'likes');
    this.memeService.like(id);
  }

  unLike(id: string): void {
    this.userService.removeFromIdArray(id, 'likes');
    this.memeService.unLike(id);
  }

  favorite(id: string): void {
    this.userService.pushToIdArray(id, 'favorites');
  }

  unFavorite(id: string): void {
    this.userService.removeFromIdArray(id, 'favorites');
  }
}
