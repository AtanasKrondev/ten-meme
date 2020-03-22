import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() memes$;
  user: User;
  path: string;

  constructor(private userService: UserService) {
    this.userService.authState().subscribe(user => this.user = user);
  }
}
