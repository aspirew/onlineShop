import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn = false
  userName = ""
  cart = 0

  constructor(private breakpointObserver: BreakpointObserver, 
    private user: UserService, 
    private auth: AuthService,
    public utils: UtilsService
    ) {
      utils.changeEmitted$.subscribe(num => {
        this.cart = num
      })
    }

    ngOnInit(){
      this.cart = this.utils.getNumOfProductsInCart()
    }

    checkLoginState(event){
      this.user.getData().subscribe(data => {
        if(data.success){
          this.userName = data.username
          this.auth.setLoggedIn(true)
          this.isLoggedIn = true
        }
        else{
          this.userName = ""
          this.isLoggedIn = false
        }
      })
    }
}
