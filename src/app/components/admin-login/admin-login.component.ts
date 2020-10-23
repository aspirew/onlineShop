import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  password = null

  async loginAdmin(){
    console.log("logging in")
    this.admin.loginAdmin(this.password).subscribe(res => {
      if(res.status){
        this.router.navigate(['/admin/dashboard'])
      }
    })
  }

}
