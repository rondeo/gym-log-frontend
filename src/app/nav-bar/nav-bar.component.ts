import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  showClasses = {show: false};
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  async onLogout() {
    await this.authService.logout();
    await this.toggleMenu();
    this.router.navigate(['/signin']);
  }

  toggleMenu() {
    this.showClasses.show === false ? this.showClasses.show = true : this.showClasses.show = false;
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/signin']);
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
