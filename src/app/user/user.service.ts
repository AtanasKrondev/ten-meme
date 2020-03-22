import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../shared/interfaces/user';
import { firestore } from 'firebase/app';
import { map, flatMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User> = this.afs.collection<User>('users');

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  authState() {
    return this.authService.getUid().pipe(
      flatMap(uid => this.getUser(uid)),
      catchError(() => { console.log('Guest'); return of(null) }),
    )
  }

  pushToIdArray(id: string, array: string): void {
    if (this.authService.currentUser) {
      this.userCollection.doc(this.authService.currentUser.uid)
        .set({ [array]: firestore.FieldValue.arrayUnion(id) }, { merge: true })
        .then(() => this.snackBar.open(`Added to ${array}`, '', { duration: 4000 }))
        .catch((err) => {
          console.log(err);
          this.snackBar.open(err.message, '', { duration: 4000 });
        });
    }
    else {
      this.snackBar.open('You should be loge in to do this');
    }
  }

  removeFromIdArray(id: string, array: string): void {
    if (this.authService.currentUser) {
      this.userCollection.doc(this.authService.currentUser.uid)
        .set({ [array]: firestore.FieldValue.arrayRemove(id) }, { merge: true })
        .then(() => this.snackBar.open(`Removed from ${array}`, '', { duration: 4000 }))
        .catch((err) => {
          console.log(err);
          this.snackBar.open(err.message, '', { duration: 4000 });
        });
    }
    else {
      this.snackBar.open('You should be loge in to do this');
    }
  }

  getUser(uid?: string): Observable<User> {
    return this.userCollection.doc(uid).snapshotChanges().pipe(map(a => {
      const userData = a.payload.data() as User;
      return { ...userData };
    }))
  }

  updateUser(payload: Object): void {
    this.userCollection.doc(this.authService.currentUser.uid)
      .update(payload)
      .then(() => this.snackBar.open('Update successful!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }
}
