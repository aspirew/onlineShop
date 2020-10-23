import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  email = ""
  usr = null
  beingLoaded = false
  userNotFound = false

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  searchButtonClick(){
    this.usr = null
    if(this.email)
      this.user.getDataByEmail(this.email).subscribe(us => {
        this.userNotFound = false
        this.beingLoaded = true
        if(us.success)
          this.usr = us
        else
          this.userNotFound = true
        this.beingLoaded = false
      })
    else alert("wpisz coś xD")
  }

}
