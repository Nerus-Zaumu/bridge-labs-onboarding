import { BridgeInterceptor } from './interceptors/bridge.interceptor';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SingleItemComponent } from './home/single-item/single-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeComponent,
    SingleItemComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  exports: [
    CreateComponent,
    HomeComponent,
  ]
})
export class DashboardModule { }
