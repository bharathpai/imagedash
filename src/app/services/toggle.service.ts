import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  showPassword: boolean = false
  icon: string = 'visibility'

  constructor() { }
  // Password Visibility Toggler
  public togglePasswordVisibility(event: any) {
    this.showPassword = !this.showPassword
    if (event.target.classList[0] == "mat-icon") {
      if (this.showPassword) {
        event.target.innerText = 'visibility_off'
        // console.log(event);
      }
      else {
        event.target.innerText = "visibility"
        // console.log(event)
      }
    }
  }
}
