import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { user } from '../signin';
import { ToastrService } from 'ngx-toastr'


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

  constructor(private http: HttpClient, public router: Router, private toastr: ToastrService) { }

  // Signup Post request (returns an Observable).
  signUp(user: user): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Login Post request.
  logIn(user: user) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user).pipe(catchError(this.handleError));
  }

  //get token from Session Storage.
  getToken() {
    return sessionStorage.getItem('access_token');
  }

  // Check to see if Login is successfull.
  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  // Check to see if Signup is successfull.
  get isSignedUp(): boolean {
    let isSignedUp = sessionStorage.getItem('isSignUpFailed')!
    return Boolean(JSON.parse(isSignedUp))
  }

  // Logout Logic.
  doLogout() {
    let removeToken = sessionStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
      this.toastr.success('Logout Successfull!!')
    }
  }

  // Error handling.
  handleError(error: HttpErrorResponse) {
    let msg: string = error.error.error.message || error.error.error
    return throwError(() => 'Error:' + ' ' + msg);
  }
}