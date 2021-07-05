import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../common/Interfaces';
import { ERole } from '../common/Enums';

const baseUrl = 'http://localhost:3000';

const endpoints = {
  login: '/login',
  signUp: '/signup',
  logout: '/logout',
  updateUser: '/user',
  refreshToken: '/refresh',
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  signedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);

  constructor() {
    this.getUser();
  }

  getUser(): void {
    this.user$.next({
      created: new Date(),
      deleted: false,
      email: 'gerrit.burger@bbd.co.za',
      firstName: 'Gerrit',
      id: 1,
      lastName: 'Burger',
      passwordHash: 'sdafgaf323!@$!@#ujdfs',
      roles: [ERole.user],
      username: 'GerritBurger',
    });
    // TODO: call login endpoint.

    // if successful: this.signedIn$.next(true);
  }

  getUserData(): Observable<IUser> {
    return this.user$.asObservable();
  }

  geUserName(): string {
    let username: string = '';

    this.user$.subscribe((value) => (username = value.username));

    return username;
  }
}
