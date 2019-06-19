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
  selectedFile: File = null;
  showClasses = {show: false};
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  async onLogout() {
    await this.authService.logout();
    await this.toggleMenu();
    this.router.navigate(['/signin']);
  }

  toggleMenu() {
    this.showClasses.show === false ? this.showClasses.show = true : this.showClasses.show = false;
  }

  async ngOnInit() {
    await this.getAvatar();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/signin']);
    }
  }

  async onFileSelected(event: any) {
    this.selectedFile = await <File>event.target.files[0];
    const fd = new FormData();
    fd.append('myAvatar', this.selectedFile);
    this.http.post('/api/avatar', fd)
    .subscribe( res => {
      console.log('Avatar uploaded succesfully!');
    });
  }

  async getAvatar() {
    await this.http.get<{ message: String, avatar: String }>('/api/avatar')
    .subscribe( async res => {
      console.log(res);
      this.avatar = await res.avatar;
      console.log(this.avatar);
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
