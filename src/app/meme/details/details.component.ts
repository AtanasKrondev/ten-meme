import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { MemeService } from '../meme.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  id: string = this.activatedRoute.snapshot.params.id;
  user: User;
  meme;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private memeService: MemeService,
    private userService: UserService) {
    this.memeService.getMemeById(this.id).subscribe(meme => {
      this.meme = meme;
      console.log(this.meme);
    });
    this.userService.authState().subscribe(user => this.user = user);
  }

  goBack() {
    this._location.back();
  }
}
