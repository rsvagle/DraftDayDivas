import { Injectable }           from "@angular/core";
import {
    Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree
}                               from "@angular/router";
import { Observable, of }       from "rxjs";
import { catchError, map }      from 'rxjs/operators';

import { AuthService }          from "./auth.service";

@Injectable()
export class AuthGuard {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      return this.router.createUrlTree(['/login']);
    }
  }
}