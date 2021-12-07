import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { UploaderComponent } from './dashboard/components/uploader/uploader.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent},
  {path:"upload",component:UploaderComponent},
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }