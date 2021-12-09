import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(y => y.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }