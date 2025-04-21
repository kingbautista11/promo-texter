import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';
import { from, switchMap, pipe, Observable, of, concatMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$;

  constructor(private auth: Auth) {
    this.currentUser$ = authState(this.auth);
  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }
  logout() {
    return from(this.auth.signOut());
  }

  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('User not found');

        return updateProfile(user, profileData);
      })
    );
  }
}
