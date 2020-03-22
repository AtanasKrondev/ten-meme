import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MemeService } from 'src/app/meme/meme.service';
import { CommentService } from 'src/app/comment/comment.service';
import { flatMap } from 'rxjs/operators';
import { UserUid } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  uid = this.authService.getUid();
  uploads$;
  likes$;
  favorites$;
  comments$;
  user: UserUid;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private memeService: MemeService,
    private commentService: CommentService) {
    this.uploads$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'uploads')));
    this.likes$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'likes')));
    this.favorites$ = this.uid.pipe(flatMap(uid => this.memeService.getMemeListOfUser(uid, 'favorites')));
    this.comments$ = this.uid.pipe(flatMap(uid => this.commentService.getCommentListOfUser(uid)));
    this.userService.authState().subscribe(user => this.user = user);
  }
}
