import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private auth: AuthService, private toastr: ToastrService) { }
  signUpToastr() {
    if (!this.auth.isSignedUp) {
      this.toastr.info("Signup Successfull!")
    }
  }

  logInToastr() {
    if (this.auth.isLoggedIn) {
      this.toastr.success("Login Successfull!")
    }
  }

  signUpFailedToastr(msg) {
    this.toastr.error(msg)
  }

  logInFailedToastr(msg) {
    this.toastr.error(msg)
  }
}