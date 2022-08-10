import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './../material/material.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class SharedModule { }
