import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from storage
    const authToken = localStorage.getItem('authToken');
    // or const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // If the token is present, clone the request and add the authorization header
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Token ${authToken}`)
      });
      return next.handle(authReq);
    }

    // If the token is not available, just forward the request without modifying it
    return next.handle(request);
  }
}