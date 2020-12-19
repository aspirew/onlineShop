import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { switchMap } from 'rxjs/operators'
import { OrderService } from './services/order.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerOfOrderGuard implements CanActivate {

  constructor(private router: Router, private user: UserService, private order: OrderService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.user.getData().pipe(switchMap(async res => {

    if(res.success){
      const order = await this.order.getOrder(next.params.id).toPromise()
      if(order.email != res.email) this.router.navigate(['/404'])
      return order.email == res.email
    }
    else {
      const unregisterd = await this.user.checkUnregisteredUserHasInitializedOrder().toPromise()
      if(!unregisterd.status) this.router.navigate(['/404'])
      return unregisterd.status
     
    }

  }))
}
}
