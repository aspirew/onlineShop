import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public utils : UtilsService) { }

  ngOnInit(): void {
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

  }

}
