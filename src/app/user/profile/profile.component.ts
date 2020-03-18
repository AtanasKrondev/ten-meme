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
  uid = this.userService.getUid();
  uploads$;
  likes$;
  favorites$;
  user;

  constructor(private userService: UserService,
    private memeService: MemeService) {
    this.uploads$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'uploads')));
    this.likes$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'likes')));
    this.favorites$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'favorites')));
    this.userService.authState().subscribe(user => this.user = user);
  }
}
