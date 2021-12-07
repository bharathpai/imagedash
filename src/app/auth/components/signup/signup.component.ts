import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/signin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userobj: user = new user();
  isSignUpFailed: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {
  }


  ngOnInit(): void {
  }

  userDetails: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]],
    confirm: ['']
  })

  registerUser() {
    console.warn(this.userDetails.value);

    this.userobj.email = this.userDetails.value.email;
    this.userobj.password = this.userDetails.value.password;
    console.warn(this.userobj);

    this.authservice.signUp(this.userobj).subscribe(
      (res) => {
        if (!res.error) {
          this.userDetails.reset();
          this.isSignUpFailed = false;
          console.warn(this.isSignUpFailed);
          this.router.navigate(['/login']);
        }

        console.warn('res :' + JSON.stringify(res));

        return res;
      },
      (err) => {
        console.warn(err);

        this.isSignUpFailed = true;
        console.warn(this.isSignUpFailed);
      }
    );
  }
}