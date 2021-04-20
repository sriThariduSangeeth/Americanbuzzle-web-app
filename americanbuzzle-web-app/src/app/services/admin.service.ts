import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignInData } from '../model/signInData';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Tokens } from '../model/tokens';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_NAME = 'USER_NAME';
  private readonly USER_MAIL = 'USER_MAIL';

  constructor(private httpClient: HttpClient) { }


  public login(logindata: SignInData) {
    return this.httpClient.post<any>(`${environment.apiUrl}/users/login/`, logindata).pipe(
      tap((tokens: Tokens) => {
        console.log(tokens);
        this.doLoginUser(tokens);
      }),
      mapTo(true),
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error);

          alert(error.error.data);
          return of(false);
        }
      )
    );
  }

  private doLoginUser(tokens: Tokens) {
    console.log(tokens)
    this.storeTokens(tokens);
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean {
    if (this.getJwtToken()) {
      return true;
    }
    return false;
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.USER_NAME, tokens.user);
    localStorage.setItem(this.USER_MAIL, tokens.userEmail);
  }

  public createUser() {

  }

  public doLogoutUser() {
    // this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER_NAME);
    localStorage.removeItem(this.USER_MAIL);
  }

}