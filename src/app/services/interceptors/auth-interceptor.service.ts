import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token'); // This retrieves a token from local storage
    //req.headers.set('Authorization', 'Bearer ' + token);
    //req.headers.set('Content-Type', 'application/json');
    req = req.clone({setHeaders: {'Authorization': `Bearer ${token}`}});// This clones HttpRequest and Authorization header with Bearer token added
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Catching Error Stage
          if (error && error.status === 401) {
            console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
          }
          const err = error.error.message || error.statusText;
          return throwError(error); // any further errors are returned to frontend
        })
      );
  }
}
