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
  memes: MemeId[];

  constructor(private userService: UserService,
    private memeService: MemeService) {
    this.uid = this.userService.currentUser.uid;
    this.userService.getUser(this.uid)
      .pipe(
        map(a => a.uploads.map(id => this.memeService.getMemeById(id))),
        flatMap(observables => combineLatest(observables)),
        flatMap(observables => combineLatest(observables)),
      )
      .subscribe(memes => {
        this.memes = memes;
        console.log(memes)
      });
    // this.userService.userCollection.doc(this.userService.currentUser.uid)
    //   .valueChanges()
    //   .subscribe(({ uploads }) => {
    //     if (uploads) {
    //       uploads.forEach(upload => {
    //         this.memeService.getMemeById(upload)
    //           .subscribe(a => this.memes.push(a))
    //       })
    //     };
    //   })
  }
}
