import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MemeService } from 'src/app/meme/meme.service';
import { MemeId } from 'src/app/shared/interfaces/meme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  memes: MemeId[];

  constructor(private userService: UserService,
    private memeService: MemeService) {
    this.memes = [];
    this.userService.userCollection.doc(this.userService.currentUser.uid)
      .valueChanges()
      .subscribe(({ uploads }) => {
        if (uploads) {
          uploads.forEach(upload => {
            this.memeService.getMemeById(upload)
              .subscribe(a => this.memes.push(a))
          })
        };
      })
  }
  //   this.userService.userCollection.doc(this.userService.currentUser.uid)
  //     .valueChanges()
  //     .subscribe(({ uploads }) => {
  //       if (uploads) {
  //         this.memeService.memeCollection.get()
  //       }
  //     })
  // }
}
