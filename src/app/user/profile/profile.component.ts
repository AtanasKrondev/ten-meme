import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MemeService } from 'src/app/meme/meme.service';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { map, flatMap, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  uid: string;
  // uploads: Observable;
  uploads$;
  likes$;
  favorites$;

  constructor(private userService: UserService,
    private memeService: MemeService) {
    this.uid = this.userService.currentUser.uid;
    this.uploads$ = this.memeService.getMemeListOfUser(this.uid, 'uploads');
    this.likes$ = this.memeService.getMemeListOfUser(this.uid, 'likes');
    this.favorites$ = this.memeService.getMemeListOfUser(this.uid, 'favorites');
  }
}
