import { Component } from '@angular/core';
import { MemeService } from '../meme.service';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/user/user.service';
import { flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  memes$;
  user: User;

  constructor(private memeService: MemeService,
    private userService: UserService) {
    this.userService.authState().subscribe(user => this.user = user);
    this.memes$ = this.memeService.memes;
  }
}
