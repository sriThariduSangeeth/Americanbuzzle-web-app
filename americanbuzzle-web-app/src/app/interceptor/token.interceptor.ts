import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AdminService, public router: Router, public activeRoute: ActivatedRoute, private authser: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    // return next.handle(request).pipe(catchError(error => {
    //   if (error instanceof HttpErrorResponse && error.status === 401 || error instanceof HttpErrorResponse && error.status === 401) {
    //     return this.handle401Error(request, next);
    //   }else{
    //     return throwError(error);
    //   }
    // }));
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.authser.doLogoutUser();
      this.router.navigateByUrl(`/`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    } else if (err.status === 0) {
      console.log(err.message);
    }
    return throwError(err);
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

  //   this.router.navigate(['login'], { relativeTo: this.activeRoute });

  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(token.jwt);
  //         return next.handle(this.addToken(request, token.jwt));
  //       }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  // }
}
