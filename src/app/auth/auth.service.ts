import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/interfaces/user';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    private router: Router,
    private snackBar: MatSnackBar) {
    this.afAuth.authState
      .subscribe((user) => {
        this._currentUser = user;
        // console.log(this.currentUser);
      }, () => console.log('Guest'))
  }

  getUid(): Observable<string> {
    return this.afAuth.authState.pipe(
      map(user => user.uid),
      // tap(a => console.log(a))
    )
  }

  register(email: string, password: string): void {
    const newUser: User = {
      displayName: '', photoURL: '', uploads: [], likes: [], favorites: [], comments: [], showNsfw: true,
    };
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this._currentUser = user;
        this.userCollection.doc(user.user.uid).set(newUser).catch(err => console.log(err))
      })
      .then(() => this.router.navigate(['/user/settings']))
      .then(() => this.snackBar.open('Registration successful! Welcome aboard!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  login(email: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => this._currentUser = user)
      .then(() => this._location.back())
      .then(() => this.snackBar.open('Welcome back!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this._currentUser = null;
        this.router.navigate(['']);
      })
      .then(() => this.snackBar.open('Bye-bye!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  updateDisplayName(displayName: Object): void {
    this.afAuth.auth.currentUser.updateProfile(displayName)
      .then(() => this.userCollection.doc(this.currentUser.uid).set(displayName, { merge: true }).catch(err => console.log(err)))
      .then(() => this.snackBar.open('Update successful!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  updatePhotoURL(photoURL: Object) {
    this.afAuth.auth.currentUser.updateProfile(photoURL)
      .then(() => this.userCollection.doc(this.currentUser.uid).set(photoURL, { merge: true }).catch(err => console.log(err)))
      .then(() => this.snackBar.open('Update successful!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  updateEmail(email: string): void {
    this.afAuth.auth.currentUser.updateEmail(email)
      .then(() => this.snackBar.open('Update successful!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  updatePassword(password: string): void {
    this.afAuth.auth.currentUser.updatePassword(password)
      .then(() => this.snackBar.open('Update successful!', '', { duration: 4000 }))
      .catch((err) => {
        console.log(err);
        this.snackBar.open(err.message, '', { duration: 4000 });
      });
  }

  authPrompt(confirmPassword: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(this.currentUser.email, confirmPassword)
  }

  handleAuthPrompt(confirmPassword: string, { email, password }: { email: string, password: string }): void {
    if (confirmPassword) {
      this.authPrompt(confirmPassword)
        .then(() => {
          if (email) { this.updateEmail(email) };
          if (password) { this.updatePassword(password) };
        })
        .catch((err) => {
          console.log(err);
          this.snackBar.open(err.message, '', { duration: 4000 });
        });
    }
  }
}
