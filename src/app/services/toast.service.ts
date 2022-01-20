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
      this.toastr.info("Signup Successfull!", undefined, { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' })
    }
  }

  logInToastr() {
    if (this.auth.isLoggedIn) {
      this.toastr.success("Login Successfull!", undefined, { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' })
    }
  }

  signUpFailedToastr(msg) {
    this.toastr.error(msg, undefined, { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' })
  }

  logInFailedToastr(msg) {
    this.toastr.error(msg, undefined, { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' })
  }

  emptyUpload(message) {
    this.toastr.error(message, undefined, { timeOut: 2500, progressBar: true, progressAnimation: 'increasing' })
  }

  uploadSuccess() {
    this.toastr.success('File Uploaded Successfully!!', undefined, { timeOut: 1800, progressBar: true, progressAnimation: 'increasing' })
  }

  rowAdd() {
    this.toastr.info('New Row Added!', undefined, { timeOut: 750, progressBar: true, progressAnimation: 'increasing' })
  }

  rowRemove() {
    this.toastr.info('Row Removed!', undefined, { timeOut: 750, progressBar: true, progressAnimation: 'increasing' })
  }

  dataClear() {
    this.toastr.success('Data cleared successfully!!', undefined, { timeOut: 2500, progressBar: true, progressAnimation: 'increasing' })
  }

  unique() {
    this.toastr.error('Zone not Unique', undefined, { timeOut: 2500, progressBar: true, progressAnimation: 'increasing' })
  }

  validUpload(){
    this.toastr.error('Please upload a Valid Excel Sheet(.xlsx) or a .csv file!', undefined, { timeOut: 2500, progressBar: true, progressAnimation: 'increasing' })
  }
}
