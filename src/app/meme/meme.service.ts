import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, flatMap, tap, shareReplay } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Meme } from '../shared/interfaces/meme';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memeCollection: AngularFirestoreCollection<Meme>;

  constructor(private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.memeCollection = this.afs.collection<Meme>('memes');
  }

  getMemes(queryFn: QueryFn) {
    return this.afs.collection<Meme>('memes', queryFn)
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(actions => actions.map(a => {
          const memeData = a.payload.doc.data() as Meme;
          const id = a.payload.doc.id;
          return { id, ...memeData }
        })),
        // tap(a => console.log(a)),
      );
  }

  addMeme(meme: Meme): void {
    this.memeCollection.add(meme)
      .then(({ id }) => this.userService.pushToIdArray(id, 'uploads'))
      .then(() => this.router.navigate(['']))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  editMeme(meme, id: string): void {
    this.memeCollection.doc(id).update(meme)
      .then(() => this.router.navigate(['meme', 'details', id]))
      .then(() => this.snackBar.open('Edited successfully!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  deleteMeme(id: string): void {
    this.router.navigate(['user', 'profile'])
    this.memeCollection.doc(id).delete()
      .then(() => this.snackBar.open('Deleted successfully!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
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
        // tap(a => console.log(a))
      )
  }

  like(id: string): void {
    this.memeCollection.doc(id)
      .set({ likes: firestore.FieldValue.increment(1) }, { merge: true })
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  unLike(id: string): void {
    this.memeCollection.doc(id)
      .set({ likes: firestore.FieldValue.increment(-1) }, { merge: true })
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }
}
