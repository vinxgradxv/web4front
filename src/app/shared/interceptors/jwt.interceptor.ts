import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor");
    const statusObject = this.authService.getStatusObject;
    const token = (statusObject != null) ? statusObject.password : null;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(req);
    /*
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error RRRRR");
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(error);
      }));*/
    // return next.handle(req).pipe(
    //   map(
    //     (event: HttpEvent<any>) => {
    //       console.log("here");
    //       if (event instanceof HttpErrorResponse) {
    //         console.log("ERRRRRORRRR");
    //         if (event.status === 401) {
    //           this.router.navigate(['login']);
    //         }
    //       }
    //       return event;
    //     }
    //     )
    //   );
  }
}
