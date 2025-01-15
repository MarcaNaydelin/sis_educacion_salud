import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
      private authApiService: AuthApiService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = this.authApiService.currentUserValue;
      if(currentUser && currentUser.access_token) {
        request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.access_token}`
          }
      });
      }
      return next.handle(request);
    }
}
