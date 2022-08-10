import { BridgeGuard } from './guards/bridge.guard';
import { SingleItemComponent } from './home/single-item/single-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent,
  canActivate: [BridgeGuard],
   children: [
    {path: 'home', component: HomeComponent, children: [
      {path: ':id', component: SingleItemComponent}
    ]},
    {path: 'create', component: CreateComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
