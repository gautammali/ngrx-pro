import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccess } from './auth.actions';

const _authReducers = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log("user in the reducres",action.user);
    
    return { 
        ...state,
        user:action.user
     };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducers(state, action);
}
