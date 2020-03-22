import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { MemeService } from '../meme.service';
import { UserService } from 'src/app/user/user.service';
import { CommentService } from 'src/app/comment/comment.service';
import { User } from 'src/app/shared/interfaces/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  id: string = this.route.snapshot.params.id;
  user: User;
  meme;
  comments$;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private memeService: MemeService,
    private userService: UserService,
    private commentService: CommentService) {
    this.memeService.getMemeById(this.id).subscribe(meme => {
      this.meme = meme;
      console.log(this.meme);
    });
    this.userService.authState().subscribe(user => this.user = user);
    this.comments$ = this.commentService.getComments(this.id);
  }

  goBack(): void {
    this._location.back();
  }
}
