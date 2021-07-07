import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../common/Interfaces';
import {ERole} from '../common/Enums';
import {HttpClient, HttpResponse} from "@angular/common/http";

const BaseURL = 'http://localhost:3000';

const ApiEndpoints = {
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

  constructor(private http: HttpClient) {}

  geUserName(): string {
    let username: string = '';

    this.user$.subscribe((value) => (username = value.username));

    return username;
  }

  login(username: string, password: string): void {
    const payload = {
      username: username,
      password: password
    }

    let userData: IUser = {} as IUser;

    this.http.post(BaseURL + ApiEndpoints.login, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      const result = response.body;

      if (response.status === 200) {
        sessionStorage.setItem('accessToken', result.accessToken);
        sessionStorage.setItem('refreshToken', result.refreshToken);

        userData.username = response.body.username;
        userData.firstname = response.body.firstname;
        userData.lastname = response.body.lastname;

        this.user$.next(userData);
        this.signedIn$.next(true);
      }
    });
  }

  signup(data: any): void {
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      passwordConfirmed: data.passwordConfirmed,
      username: data.username,
      email: data.email
    }

    this.http.post(BaseURL + ApiEndpoints.signUp, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {

      if (response.status === 200) this.login(data.username, data.password);
    });
  }

  logout() {
    this.user$.next({} as IUser);
    this.signedIn$.next(false);

    sessionStorage.clear();
  }
}
