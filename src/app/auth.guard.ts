import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators'
import { AdminService } from './services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private admin: AdminService, private router: Router, private user: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user.isLoggedIn().pipe(map(res => {
      if(res.status) {
        this.router.navigate(['/'])
        return false
      } else {
        return true
      }
    }))
  }

}
