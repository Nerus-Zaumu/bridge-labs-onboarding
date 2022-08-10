import { UserService } from './../../user/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class BridgeInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.userService.bridgeUser.pipe(
      take(1), exhaustMap(user => {
        if(!user){
          return next.handle(request)
        }
        const modifiedReq = request.clone(
          {params: new HttpParams().set('auth', user.token as string), headers: new HttpHeaders()})
        return next.handle(modifiedReq);
      })
    );
  }
}
