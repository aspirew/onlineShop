import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private user: UserService) { }

  currentPassword = ""
  newPassword = ""
  cNewPassword = ""

  ngOnInit(): void {
  }

  changePassword(){
    if(this.newPassword != this.cNewPassword){
      alert("Hasła się nie zgadzają!")
      return
    }

    this.user.changeUserPassword(this.currentPassword, this.newPassword).subscribe(result => {
      if(!result.status)
        alert("Błędne aktualne hasło")
      else
        alert("Hasło zmieniono pomyślnie")
    })

  }

}
