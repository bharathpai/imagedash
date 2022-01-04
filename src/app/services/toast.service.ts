import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private auth: AuthService, private toast: ToastrService) { }
  signUpToastr() {
    if (!this.auth.isSignedUp) {
      this.toast.info("Signup Successfull!")
    }
  }

  logInToastr() {
    if (this.auth.isLoggedIn) {
      this.toast.success("Login Successfull!")
    }
  }

}