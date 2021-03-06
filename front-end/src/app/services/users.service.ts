import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../common/Models/Interfaces';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../components/snackbar/snackbar.component";
import {ELoginMessages, ELogOutMessages, ESignUpMessages, ESnackBarType, EUpdateProfileMessages} from "../common/Models/Enums";
import {SNACKBAR_DURATION} from "../common/Constants/Constants";

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
  getBlogs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private snackbar: MatSnackBar, public dialog: MatDialog) {
    if (this.isLoggedIn) {
      if (!localStorage.getItem('userData') && sessionStorage.getItem('userData')) {
        localStorage.setItem('userData', <string>sessionStorage.getItem('userData'));
        localStorage.setItem('accessToken', <string>sessionStorage.getItem('accessToken'));
        localStorage.setItem('refreshToken', <string>sessionStorage.getItem('refreshToken'));

        this.user$.next(JSON.parse(<string>localStorage.getItem('userData')));
      } else if (localStorage.getItem('userData')) {
        this.user$.next(JSON.parse(<string>localStorage.getItem('userData')));
      }

      this.signedIn$.next(true);
    } else {
      this.signedIn$.next(false);
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null || sessionStorage.getItem('accessToken') !== null;
  }

  getUserName(): string {
    let username: string = '';

    this.user$.subscribe((value) => (username = value.username));

    return username;
  }

  login(username: string, password: string, autoReject: boolean=false): void {
    const payload = {
      username: username,
      password: password
    }

    if (autoReject) {
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: SNACKBAR_DURATION,
        panelClass: [ESnackBarType.error],
        data: {
          message: ELoginMessages.notHuman,
        }
      });
      return;
    }
    let userData: IUser = {} as IUser;

    this.http.post(BaseURL + ApiEndpoints.login, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      const result = response.body;

      if (response.status === 200) {
        sessionStorage.setItem('accessToken', result.accessToken);
        sessionStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        userData.username = response.body.username;
        userData.firstname = response.body.firstname;
        userData.lastname = response.body.lastname;

        this.user$.next(userData);

        localStorage.setItem('userData', JSON.stringify(userData));
        sessionStorage.setItem('userData', JSON.stringify(userData));

        this.signedIn$.next(true);
        this.getBlogs$.next(true);

        this.dialog.closeAll();

        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.success],
          data: {
            message: ELoginMessages.loginSuccess,
          }
        });
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: ELoginMessages.loginFailure,
          }
        });
      }
    },
    error => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: SNACKBAR_DURATION,
        panelClass: [ESnackBarType.error],
        data: {
          message: error.error.message,
        }
      });
    });
  }

  signup(data: any): void {
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      passwordConfirmed: data.passwordConfirmed,
      username: data.username,
    }

    this.http.post(BaseURL + ApiEndpoints.signUp, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {

      if (response.status === 201) {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.success],
          data: {
            message: ESignUpMessages.signUpSuccess,
          }
        });

        this.login(data.username, data.password);
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: ESignUpMessages.signUpFailure,
          }
        });
      }
    },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
      });
  }

  logout() {
    this.http.request('delete', BaseURL + ApiEndpoints.logout, {
      body: {
        "refreshToken": sessionStorage.getItem('refreshToken')
      }
    }).subscribe(
      data => {
        this.user$.next({} as IUser);
        this.signedIn$.next(false);

        sessionStorage.clear();
        localStorage.clear();

        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.success],
          data: {
            message: ELogOutMessages.logOutSuccess,
            type: ESnackBarType.success
          }
        });

        this.getBlogs$.next(true);
      },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
      }
    );
  }

  updateProfile(data: any, userData: IUser) {
    let payload = {}

    if (data.username && (data.username !== userData.username)) {
      Object.assign(payload, {username: data.username});
    } else {
      data.username = userData.username;
    }

    if (data.firstname) {
      Object.assign(payload, {firstname: data.firstname});
    } else {
      data.firstname = userData.firstname
      Object.assign(payload, {firstname: userData.firstname});
    }

    if (data.lastname) {
      Object.assign(payload, {lastname: data.lastname});
    } else {
      data.lastname = userData.lastname
      Object.assign(payload, {lastname: userData.lastname});
    }

    if (data.password) Object.assign(payload, {password: data.password});
    if (data.passwordConfirmed) Object.assign(payload, {passwordConfirmed: data.passwordConfirmed});

    this.http.put(BaseURL + ApiEndpoints.updateUser, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        sessionStorage.setItem('accessToken', response.body.accessToken);
        localStorage.setItem('accessToken', response.body.accessToken);

        delete data.passwordConfirmed;
        this.user$.next(data as IUser);

        delete data.password;
        sessionStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('userData', JSON.stringify(data));

        this.dialog.closeAll();

        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.success],
          data: {
            message: EUpdateProfileMessages.updateProfileSuccess,
          }
        });
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: EUpdateProfileMessages.updateProfileFailure,
          }
        });
      }
    },
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: SNACKBAR_DURATION,
          panelClass: [ESnackBarType.error],
          data: {
            message: error.error.message,
          }
        });
      });
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    const payload = {
      refreshToken
    }

    this.http.post(BaseURL + ApiEndpoints.refreshToken, payload, {
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        const token = response.body.accessToken;

        localStorage.setItem('accessToken', token);
        sessionStorage.setItem('accessToken', token);
      }
    });
  }
}
