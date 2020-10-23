import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './services/admin.service';
import { map } from 'rxjs/operators'
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {

  constructor(private admin: AdminService, private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.user.isLoggedIn().pipe(map(res => {

      this.admin.isLoggedIn().subscribe(result => {
        if(result.status) this.router.navigate(['/admin/dashboard'])
      })

      if(res.status) {
        this.router.navigate(['/404'])
        return false
      }
      return true
    }))
  }

}
