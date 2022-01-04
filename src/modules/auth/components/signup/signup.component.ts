import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/signin';
import { AuthService } from 'src/app/services/auth.service';
import { ElementRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ToggleService } from 'src/app/services/toggle.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userobj: user = new user();
  isSignUpFailed: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService,
    private elref: ElementRef, private toast: ToastService,
    public toggle: ToggleService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elref.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F1F0FF';
  }


  userDetails: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(-)?[a-zA-Z0-9]+(.)?[a-zA-Z0-9]{2,6}?.[a-zA-Z]{2,6}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]],
    confirm: ['', Validators.required]
  })

  // Register user (Signup) Logic (subscription of the signup post request Observable.)
  registerUser() {
    this.userobj.email = this.userDetails.value.email;
    this.userobj.password = this.userDetails.value.password;

    this.authservice.signUp(this.userobj).subscribe({
      next: (res) => {
        if (!res.error) {
          this.userDetails.reset();
          this.isSignUpFailed = false;
          sessionStorage.setItem('isSignUpFailed', `${this.isSignUpFailed}`);
          this.toast.signUpToastr()
          this.router.navigate(['/login']);
        }
        return res;
      },
      error: (err) => {
        this.isSignUpFailed = true;
        this.toast.signUpFailedToastr(err)
      }
    });
  }


}