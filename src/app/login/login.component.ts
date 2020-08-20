import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../utils.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(public utils : UtilsService, private auth: AuthService, private router: Router, private user: UserService) { }

  beingLoaded = false

  ngOnInit(){
  }

  loginUser(event){
    this.beingLoaded = true
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.auth.logUserIn(username, password).subscribe(data => {

      if(data.success){
        this.router.navigate(['/'])
      } else {
        window.alert(data.message)
      }
    }) 
  
  }


}
