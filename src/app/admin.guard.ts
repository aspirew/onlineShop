import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './services/admin.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private admin: AdminService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.admin.isLoggedIn().pipe(map(res => {
      if(res.status) {
        this.router.navigate(['/admin'])
        return false
      } else {
        return true
      }
    }))
  }

}
