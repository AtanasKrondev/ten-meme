import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, flatMap, tap, take, shareReplay } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Meme, MemeId } from '../shared/interfaces/meme';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memeCollection: AngularFirestoreCollection<Meme>
  memes;

  constructor(private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
  ) {
    this.memeCollection = this.afs.collection<Meme>('memes', ref =>
      ref.orderBy('createdAt', 'desc'));
    this.memes = this.memeCollection.snapshotChanges()
      .pipe(
        shareReplay(1),
        map(actions => actions.map(a => {
          const memeData = a.payload.doc.data() as Meme;
          const id = a.payload.doc.id;
          return { id, ...memeData }
        })),
        tap(a => console.log(a)),
      );
  }

  addMeme(meme: Meme) {
    this.memeCollection.add(meme)
      .then(({ id }) => this.userService.pushMeme(id, 'uploads'))
      .then(() => this.router.navigate(['']))
      .catch(err => console.log(err));
  }

  getMemeById(id: string) {
    return this.memeCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const memeData = a.payload.data() as Meme;
        const id = a.payload.id;
        return { id, ...memeData }
      }),
    )
  }

  getMemeListOfUser(uid: string, list: string) {
    return this.userService.getUser(uid)
      .pipe(
        map(a => a[list].map((id: string) => this.getMemeById(id))),
        flatMap(observables => combineLatest(observables)),
        tap(a => console.log(a))
      )
  }
}
