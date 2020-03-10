import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  get isLogged() { return this.userService.isLogged }
  get currentUser() { return this.userService.currentUser }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router,
  ) { }

  logout() {
    this.userService.logout();
  }
}
