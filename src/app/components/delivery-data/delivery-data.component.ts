import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delivery-data',
  templateUrl: './delivery-data.component.html',
  styleUrls: ['./delivery-data.component.css']
})
export class DeliveryDataComponent implements OnInit {

  beingLoaded = true
  name = ""
  surname = ""
  street = ""
  houseNum = null
  flatNum = null
  city = ""
  zip = ""

  constructor(public utils : UtilsService, private router: Router, private user: UserService) {
    user.getData().subscribe(res => {
      const delivery = res.deliveryDetails
      this.name = delivery.name
      this.surname = delivery.surname
      this.street = delivery.street
      this.houseNum = delivery.houseNum
      this.flatNum = delivery.flatNum
      this.city = delivery.city
      this.zip = delivery.zip

      this.beingLoaded = false
    })
  }

  ngOnInit(): void {
  }

  async saveDetails(){
    console.log(await this.user.setDeliveryData({
      name: this.name,
      surname: this.surname,
      street: this.street,
      houseNum: this.houseNum,
      flatNum: this.flatNum,
      city: this.city,
      zip: this.zip
     }).toPromise())

  }

}
