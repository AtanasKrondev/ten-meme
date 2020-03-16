import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MemeId } from 'src/app/shared/interfaces/meme';
import { MemeService } from '../meme.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  memeId: string;
  user;
  meme;
  uid: string;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private memeService: MemeService,
    private userService: UserService) {
    this.uid = this.userService.currentUser.uid;
    this.memeId = this.activatedRoute.snapshot.params.id;
    this.memeService.getMemeById(this.memeId).subscribe(meme => {
      this.meme = meme;
      console.log(this.meme);
    });
    this.userService.getUser(this.uid).subscribe(user => this.user = user);
  }

  goBack() {
    this._location.back();
  }
}
