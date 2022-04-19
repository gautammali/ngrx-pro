// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { exhaustMap, map, pipe } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
// import { loginStart, loginSuccess } from './auth.actions';
// import { User } from './../../models/user.model';

// @Injectable()
// export class AuthEffetcts {
//   constructor(private actions$: Actions, private authService: AuthService) {}
//   login$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(loginStart),
//       exhaustMap((action) =>
//         this.authService.login(action?.email, action?.password).pipe(
//           map((data) => {
//               const user:User =this.authService.formateUser(data);
//             console.log('data in the efect model', data);
//             return loginSuccess({user});
//           })
//         )
//       )
//     );
//   });
// }

import { AuthService } from './../../services/auth.service';
import { exhaustMap, map } from 'rxjs/operators';
import { loginStart, loginSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffetcts {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login().pipe(
          map((data) => {
            const storage = localStorage.getItem('google_auth');
            let user;
            if (storage) {
              user = this.authService.formateUser(JSON.parse(storage));
            }

            return loginSuccess({ user });
          })
        );
      })
    );
  });
}
