import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {UsersService} from "../services/users.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('accessToken');

    if (!token) {
      token = localStorage.getItem('accessToken');

      if (!token) return next.handle(req);
    }

    const req_success = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(req_success).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.handleAuthError();
          return of(err);
        }

        throw err;
      })
    );
  }

  private handleAuthError() {
    sessionStorage.setItem('accessToken', '');
    localStorage.setItem('accessToken', '');

    this.userService.refreshToken();
  }
}
