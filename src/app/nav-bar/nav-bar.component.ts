import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  avatar: String;
  userName: String;
  selectedFile: File = null;
  showClasses = {show: false};
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  async onLogout() {
    this.authService.logout();
    this.toggleMenu();
    this.getUser();
    this.router.navigate(['/signin']);
  }

  toggleMenu() {
    this.showClasses.show === false ? this.showClasses.show = true : this.showClasses.show = false;
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.getUser();
    });
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/signin']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('myAvatar', this.selectedFile);
    this.http.post('/api/getUser', fd)
    .subscribe( res => {
      this.getUser();
    });
  }

 getUser() {
   this.http.get<{ message: String, avatar: String, userName: String }>('/api/getUser')
    .subscribe( res => {
      this.avatar = res.avatar;
      this.avatar = this.avatar.split('\\')[1];
      this.userName = res.userName;
      console.log(this.userName);
      console.log(this.avatar);
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
