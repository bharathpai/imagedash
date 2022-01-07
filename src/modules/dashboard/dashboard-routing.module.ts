import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { TariffComponent } from './components/tariff/tariff.component';
const routes: Routes = [
    { path: 'uploader', component: UploaderComponent, canActivate: [AuthGuard] },
    { path: 'list', component: ListComponent },
    { path: 'tariff', component: TariffComponent }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }