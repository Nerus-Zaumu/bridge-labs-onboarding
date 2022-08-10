import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BridgeInterceptor } from './dashboard/interceptors/bridge.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DashboardModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left'
        },
        vertical: {
          position: 'top'
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 3000,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        onClick: false
      },
      animations: {
        enabled: true,
        show: {
          preset: 'fade',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease'
        }
      },

    })
  ],
  exports: [
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BridgeInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
