import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router, private cart: CartService) { }

  ngOnInit(): void {
    this.auth.logUserOut().subscribe(res => {
      console.log(res)
      if(res){
        this.route.navigate(['/'])
        this.cart.clearLocalCart()
      }
    })

  }

}
