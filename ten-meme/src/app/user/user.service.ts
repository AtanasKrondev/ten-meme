import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // currentUser: User;
  currentUser = true;

  get isLogged() { return !!this.currentUser }

  constructor() { }

  login(email: string, password: string) {
    this.currentUser = true;
  }

  logout() {
    this.currentUser = false;
  }
}
