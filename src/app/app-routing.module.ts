import { BridgeGuard } from './dashboard/guards/bridge.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'landing-page', pathMatch: 'full'},
  {path: 'landing-page', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},

  {path: 'users/auth', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},

  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [BridgeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
