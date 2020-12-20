import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { AdminService } from 'src/app/services/admin.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
    private cart: CartService,
    private admin: AdminService,
    private user: UserService) { }

  beingLoaded = true
  email = ""
  password = ""

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ])

  matcher = new MyErrorStateMatcher();

  async ngOnInit(){
    if((await this.admin.isLoggedIn().toPromise()).status)
      this.router.navigate(['/admin/dashboard'])
    else this.beingLoaded = false
  }

  loginUser(event){
    this.beingLoaded = true
    event.preventDefault()

    this.auth.logUserIn(this.email, this.password).subscribe(async data => {

      if(data.success){
        await this.cart.loadUserCartData()
        this.cart.updateUserCart()
        this.router.navigate(['/'])
      } else {
        window.alert(data.message)
        this.beingLoaded = false
      }
    })  

  }

  resetPassword(){
    if(this.email)
      this.user.resetPassword(this.email).subscribe(res => {
        if(res.status)
          alert("Na twoją skrzynkę wysłano zresetowane hasło")
        else
          alert("Do danego emaila nie przypisano żadnego konta")
      })  
  }


}
