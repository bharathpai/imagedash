import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }


  islogin: boolean = false;
  hehe: any;
  userDetails: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  loginUser() {
    console.warn(this.userDetails.value);
    this.authService.signIn(this.userDetails.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.islogin = false;
      console.warn(JSON.stringify(res)); //undefined
      this.authService.currentUser = res;
      console.warn('inside signin ' + res);

      this.router.navigate(['/upload' + this.userDetails.value.email]);
    }, err => {
      console.warn(err);
      this.islogin = true;

    }
    );
  }
}
