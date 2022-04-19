import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authservice: AuthService,
    private sas: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  OnUserlogin() {
    // this.authservice.login();
    // console.log("yes i run");
    this.sas.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      // this.router.navigateByUrl('').then();
    });
    const storage = localStorage.getItem('google_auth');
    let emailId: any = '';
    if (storage) {
      emailId = JSON.parse(storage);
    }
    // this.authservice.userInformationFromGoogle();
    // const email=this.loginForm.value.email;

    const email = emailId.email;
      if (email) {
        const password = this.loginForm.value.password;
        console.log(email, password);
        this.store.dispatch(loginStart());
      }
  }

  emailErrors() {
    let email = this.loginForm.get('email');
    if (email?.touched && email?.invalid) {
      return '*email is required';
    }
    if (email?.errors?.['email']) {
      return '*email is invalid';
    }
    return;
  }
  passwordError() {
    let password = this.loginForm.get('password');
    if (password?.touched && password?.invalid) {
      return '*password is required';
    }
    return;
  }
}
