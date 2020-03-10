import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { MemeService } from './meme/meme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '10MEME';

  constructor(private userService: UserService, private memeService: MemeService) {
  }

  ngOnInit() {
    this.userService.initializeAuthState();
  }
}
