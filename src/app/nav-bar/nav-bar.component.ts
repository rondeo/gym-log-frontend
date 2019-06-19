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

  onLogout() {
    this.authService.logout();
    this.toggleMenu();
    this.router.navigate(['/signin']);
  }

  toggleMenu() {
    this.showClasses.show === false ? this.showClasses.show = true : this.showClasses.show = false;
  }

  ngOnInit() {
    this.getUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/signin']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('myAvatar', this.selectedFile);
<<<<<<< HEAD
    this.http.post('/api/avatar', fd)
=======
    this.http.post('http://localhost:8080/api/getUser', fd)
>>>>>>> 513e077... Added form validation for signin and signup + fixed default picture for avatar
    .subscribe( res => {
      this.getUser();
    });
  }

<<<<<<< HEAD
  getAvatar() {
    this.http.get<{ message: String, avatar: String }>('/api/avatar')
    .subscribe( async res => {
=======
 getUser() {
   this.http.get<{ message: String, avatar: String, userName: String }>('http://localhost:8080/api/getUser')
    .subscribe( res => {
>>>>>>> 513e077... Added form validation for signin and signup + fixed default picture for avatar
      this.avatar = res.avatar;
      this.avatar = this.avatar.split('\\')[1];
      this.userName = res.userName;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
