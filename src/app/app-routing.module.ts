import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(y => y.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }