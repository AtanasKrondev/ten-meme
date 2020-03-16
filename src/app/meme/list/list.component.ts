import { Component } from '@angular/core';
import { MemeService } from '../meme.service';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  memes: MemeId[];
  uid: string = null;
  user;
  likes: string[];
  favorites: string[];

  constructor(private memeService: MemeService,
    private userService: UserService) {
    this.uid = this.userService.currentUser.uid;
    this.memeService.memes.subscribe(memes => this.memes = memes);
    this.userService.getUser(this.uid).subscribe(user => this.user = user);
  }
}
