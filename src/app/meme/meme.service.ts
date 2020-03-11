import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, flatMap, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Meme, MemeId } from '../shared/interfaces/meme';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memeCollection: AngularFirestoreCollection<Meme>;
  memes: Observable<MemeId[]>;

  constructor(private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
  ) {
    this.memeCollection = this.afs.collection<Meme>('memes');
    this.memes = this.memeCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const memeData = a.payload.doc.data() as Meme;
          const id = a.payload.doc.id;
          return this.userService.getUser(memeData.authorId).pipe(
            map(authorData => Object.assign({}, { id, ...memeData, ...authorData })))
        })),
        flatMap(observables => combineLatest(observables))
      )
  }

  addMeme(meme: Meme) {
    this.memeCollection.add(meme)
      .then((meme) => this.userService.pushMeme(meme.id))
      .then(() => this.router.navigate(['']))
      .catch(err => console.log(err));
  }

  getMemeById(id: string) {
    return this.memeCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const memeData = a.payload.data() as Meme;
        const id = a.payload.id;
        return this.userService.getUser(memeData.authorId).pipe(
          map(authorData => Object.assign({}, { id, ...memeData, ...authorData })))
      }),
      flatMap(observables => combineLatest(observables)),
      // tap(a => console.log(a)),
    )
  }
}
