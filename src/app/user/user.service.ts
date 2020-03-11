import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../shared/interfaces/user';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;

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
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.userCollection = this.afs.collection<User>('users');
  }

  initializeAuthState() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) { this._currentUser = user; console.log(this.currentUser); }
    });
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
      .then(() => this.router.navigate(['']))
      .catch(err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this._currentUser = null;
        this.router.navigate([''])
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

  pushMeme(memeId: string) {
    this.userCollection.doc(this.currentUser.uid).set({ uploads: firestore.FieldValue.arrayUnion(memeId) }, { merge: true }).catch(err => console.log(err))
  }

  getUser(uid: string) {
    return this.userCollection.doc(uid).snapshotChanges().pipe(map(a => {
      const userData = a.payload.data() as User;
      return { ...userData };
    }))
  }
}
