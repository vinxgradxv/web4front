import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const statusObject = this.authService.getStatusObject;
    const token = (statusObject != null) ? statusObject.token : null;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(req).pipe(
      map(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpErrorResponse) {
            if (event.status === 401) {
              this.router.navigate(['login']);
            }
          }
          return event;
        }
        )
      );
  }
}
