import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor( public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'verifyPassword': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.authService.createUser(
      this.signupForm.value.email,
      this.signupForm.value.userName,
      this.signupForm.value.password
      );
    }

}
