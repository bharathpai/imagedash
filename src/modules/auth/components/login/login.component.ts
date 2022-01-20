import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,
    private toast: ToastService, public toggle: ToggleService) { }

  islogin: boolean = false;
  hehe: any;
  userDetails: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(-)?[a-zA-Z0-9]+(.)?[a-zA-Z0-9]{2,6}?.[a-zA-Z]{2,6}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]],
  });

  ngOnInit(): void {
  }

  getloggin: any = true;

  loginUser() {
    this.authService.logIn(this.userDetails.value).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('access_token', res.token);
        this.islogin = false;
        this.authService.currentUser = res;
        this.toast.logInToastr()
        this.router.navigate(['/uploader']);

      }, error: err => {
        this.islogin = true;
        this.toast.logInFailedToastr(JSON.stringify(err))

        setInterval(() => {
          this.islogin = false;
        }, 10000);

      }
    }
    );
  }
}
