import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/services/user.service';
import { order } from 'src/app/interfaces';
import { FetchServiceService } from 'src/app/services/fetch-service.service';

interface summary {
  productName: String,
  quantity: number,
  value: number
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private user: UserService,
    private fetch: FetchServiceService) { }

  @ViewChild('deliveryStep') dStep: MatStep;
  @ViewChild('stepper') stepper: MatStepper;

  order: order = null
  products: Array<summary> = []
  displayedColumns = ['name', 'quantity', 'value']
  isLoggedIn = false
  id = null

  name = ""
  surname = ""
  street = ""
  houseNum = ""
  flatNum = ""
  city = ""
  zip = ""
  email = ""

  loaded = false
  totalCost = 0

  ngOnInit(): void { //need for guard
    this.route.params.subscribe(async par => {
      this.id = par.id
      this.order = await this.orderService.getOrder(this.id).toPromise()
      for(const product of this.order.products){
        const fetchedProduct = await this.fetch.getProductById(product.productID).toPromise()
        this.products.push({
          productName: fetchedProduct.name,
          quantity: product.quantity,
          value: parseFloat((fetchedProduct.price * product.quantity).toFixed(2))
        })
      }
      this.totalCost = parseFloat((this.products.map(p => p.value).reduce((acc, val) => acc + val, 0)).toFixed(2))

      this.user.isLoggedIn().subscribe(async res => {
        if(res.status){
          const usr = await this.user.getData().toPromise()
          this.email = usr.email
          this.isLoggedIn = true

          this.name = usr.deliveryDetails.name
          this.surname = usr.deliveryDetails.surname
          this.street = usr.deliveryDetails.street
          this.houseNum = usr.deliveryDetails.houseNum.toString()
          this.flatNum = usr.deliveryDetails.flatNum.toString()
          this.city = usr.deliveryDetails.city
          this.zip = usr.deliveryDetails.zip
        }
        this.loaded = true
      })
    })


  }

  deliveryReady(){
    return this.name.length > 0 && this.surname.length && this.street.length &&
    this.houseNum.length > 0 && this.city.length > 0 && this.zip.length > 0
  }

  fillDeliveryData(){
    if(this.deliveryReady()){
      this.dStep.completed = true
      this.stepper.next()
    }
  }

  makeOrder(){
    const orderData = {
      _id: null,
      email: this.email,
      products: null,
      value: null,
      deliveryDetails: {
        name: this.name,
	      surname: this.surname,
	      street: this.street,
	      houseNum: parseInt(this.houseNum),
	      flatNum: parseInt(this.flatNum),
	      city: this.city,
	      zip: this.zip
      },
      status: null,
      date: null
    }
    this.orderService.confirmOrder(this.id, orderData).subscribe(res => {
      console.log(res)
    })
  }

}
