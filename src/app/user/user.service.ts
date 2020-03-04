import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = null;

  get isLogged() { return !!this._currentUser }

  get currentUser() {
    if (this._currentUser) {
      const { uid, displayName, photoURL, email } = this._currentUser;
      return { uid, displayName, photoURL, email };
    }
    else return null;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  initializeAuthState() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this._currentUser = user;
        console.log(this._currentUser);
      }
    });
  }

  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => this._currentUser = user)
      .then(() => this.router.navigate(['/user/settings']))
      .catch(err => console.log(err))
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => this._currentUser = user)
      .then(() => this.router.navigate(['']))
      .catch(err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(result => {
        console.log(result);
        this._currentUser = null;
        this.router.navigate([''])
      })
      .catch(err => console.log(err))
  }

  updateDisplayName(displayName: Object) {
    this.afAuth.auth.currentUser.updateProfile(displayName)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  updatePhotoURL(photoURL: Object) {
    this.afAuth.auth.currentUser.updateProfile(photoURL)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  updateEmail(email: string) {
    this.afAuth.auth.currentUser.updateEmail(email)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  updatePassword(password: string) {
    this.afAuth.auth.currentUser.updatePassword(password)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  authPrompt(confirmPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(this.currentUser.email, confirmPassword)
  }

  handleAuthPrompt(confirmPassword: string, { email, password }: { email: string, password: string }) {
    if (confirmPassword) {
      this.authPrompt(confirmPassword)
        .then(result => console.log(result))
        .then(() => {
          if (email) { this.updateEmail(email) };
          if (password) { this.updatePassword(password) };
        })
        .catch((err) => console.log(err));
    }
  }
}
