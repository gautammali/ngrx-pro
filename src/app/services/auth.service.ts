import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private as: SocialAuthService, private router: Router) {}

  googleLogIn() {
    this.as.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/dataList').then();
    });
  }
  signOut() {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('').then();
  }

  login(): Observable<AuthResponseData> {
    this.googleLogIn();
    const storage = localStorage.getItem('google_auth');
    if (storage) {
      console.log('i come here');
      return of(JSON.parse(storage));
    }
    return of();
  }

  formateUser(data: any) {
    console.log('sadhfkljsahfkdjsfhlkajfhlkdsf', data);
    const expireDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expireDate);
    return user;
  }
}
