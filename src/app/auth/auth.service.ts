import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/interfaces/user';
import { Router } from '@angular/router';
import { map, flatMap, catchError, tap } from 'rxjs/operators';
// import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = null;
  userCollection: AngularFirestoreCollection<User> = this.afs.collection<User>('users');


  get isLogged() { return !!this._currentUser }
  get currentUser() {
    if (this._currentUser) {
      const { uid, displayName, photoURL, email } = this._currentUser;
      return { uid, displayName, photoURL, email };
    }
  }

  constructor(private _location: Location,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router, ) {
    this.afAuth.authState
      .subscribe((user) => {
        this._currentUser = user;
        console.log(this.currentUser);
      }, () => console.log('Guest'))
  }

  getUid() {
    return this.afAuth.authState.pipe(
      map(user => user.uid),
      tap(a => console.log(a))
    )
  }

  register(email: string, password: string) {
    const newUser: User = {
      displayName: '', photoURL: '', uploads: [], likes: [], favorites: [], comments: [], showNsfw: false,
    };
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this._currentUser = user;
        this.userCollection.doc(user.user.uid).set(newUser).catch(err => console.log(err))
      })
      .then(() => this.router.navigate(['/user/settings']))
      .catch(err => console.log(err));
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => this._currentUser = user)
      .then(() => this._location.back())
      .catch (err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this._currentUser = null;
        this.router.navigate(['']);
      })
      .catch(err => console.log(err));
  }

  updateDisplayName(displayName: Object) {
    this.afAuth.auth.currentUser.updateProfile(displayName)
      .then(() => this.userCollection.doc(this.currentUser.uid).set(displayName, { merge: true }).catch(err => console.log(err)))
      .catch(err => console.log(err));
  }

  updatePhotoURL(photoURL: Object) {
    this.afAuth.auth.currentUser.updateProfile(photoURL)
      .then(() => this.userCollection.doc(this.currentUser.uid).set(photoURL, { merge: true }).catch(err => console.log(err)))
      .catch(err => console.log(err))
  }

  updateEmail(email: string) {
    this.afAuth.auth.currentUser.updateEmail(email)
      .catch(err => console.log(err));
  }

  updatePassword(password: string) {
    this.afAuth.auth.currentUser.updatePassword(password)
      .catch(err => console.log(err));
  }

  authPrompt(confirmPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(this.currentUser.email, confirmPassword)
  }

  handleAuthPrompt(confirmPassword: string, { email, password }: { email: string, password: string }) {
    if (confirmPassword) {
      this.authPrompt(confirmPassword)
        .then(() => {
          if (email) { this.updateEmail(email) };
          if (password) { this.updatePassword(password) };
        })
        .catch((err) => console.log(err));
    }
  }
}
