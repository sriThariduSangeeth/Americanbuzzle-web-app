import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignInData } from '../model/signInData';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of , Observable} from 'rxjs';
import { Tokens } from '../model/tokens';

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_NAME = 'USER_NAME';
    private readonly USER_MAIL = 'USER_MAIL';

    constructor(private httpClient:HttpClient) { }


    public login(logindata : SignInData){
      return this.httpClient.post<any>(`${environment.apiUrl}/users/login`, logindata).pipe(
        tap((tokens: Tokens) => {
          this.doLoginUser(tokens);
        }),
        mapTo(true),
        catchError(
          error =>{
            alert(error.error);
            return of(false);
          }
        )
      );
    }

    private doLoginUser( tokens: Tokens) {
      console.log(tokens)
      this.storeTokens(tokens);
    }

    private storeTokens(tokens: Tokens) {
      localStorage.setItem(this.JWT_TOKEN, tokens.jwtToken);
      localStorage.setItem(this.USER_NAME, tokens.userName);
      localStorage.setItem(this.USER_MAIL , tokens.userEmail);
    }

    public createUser(){

    }

  }