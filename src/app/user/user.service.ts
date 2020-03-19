import { Injectable } from '@angular/core';
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
  ) { }



  authState() {
    return this.authService.getUid().pipe(
      flatMap(uid => this.getUser(uid)),
      catchError(() => { console.log('Guest'); return of(null) }),
    )
  }

  pushToIdArray(id: string, array: string) {
    if (this.authService.currentUser) {
      this.userCollection.doc(this.authService.currentUser.uid)
        .set({ [array]: firestore.FieldValue.arrayUnion(id) }, { merge: true })
        .catch(err => console.log(err));
    }
    else {
      console.log('ne moi tai da praish')
    }
  }

  removeFromIdArray(id: string, array: string) {
    if (this.authService.currentUser) {
      this.userCollection.doc(this.authService.currentUser.uid)
        .set({ [array]: firestore.FieldValue.arrayRemove(id) }, { merge: true })
        .catch(err => console.log(err));
    }
    else {
      console.log('ne moi tai da praish')
    }
  }

  getUser(uid?: string) {
    return this.userCollection.doc(uid).snapshotChanges().pipe(map(a => {
      const userData = a.payload.data() as User;
      return { ...userData };
    }))
  }
}
