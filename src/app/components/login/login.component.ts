import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    public utils : UtilsService,
    private auth: AuthService,
    private router: Router,
    private cart: CartService) { }

  beingLoaded = false

  ngOnInit(){
  }

  loginUser(event){
    this.beingLoaded = true
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.auth.logUserIn(username, password).subscribe(async data => {

      if(data.success){
        await this.cart.loadUserCartData()
        this.cart.updateUserCart()
        this.router.navigate(['/'])
      } else {
        window.alert(data.message)
      }
    })

  }


}
