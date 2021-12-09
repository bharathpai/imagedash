import { Injectable } from '@angular/core';
import { user } from '../signin';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://serene-hollows-11661.herokuapp.com/api/v1';
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) { }

  // Sign-up
  signUp(user: user): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in  
  logIn(user: user) {
    console.warn('USER:' + user.email + '&' + user.password);
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
  }

  //get token
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

