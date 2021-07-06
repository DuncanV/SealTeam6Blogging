import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.token;

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdlcnJpdEJ1cmdlciIsImlhdCI6MTYyNTU1NjYyMywiZXhwIjoxNjI1NTU3MjIzfQ.3wvOoxt_cl_8mb45L-fvBE68VtuNf635FTK82ntbTms";

    if (!token) return next.handle(req);

    const req_success = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(req_success);
  }
}
