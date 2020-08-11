import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchServiceService } from '../fetch-service.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productData = null
  isFound = true
  selectedNumber = 1

  constructor(private route: ActivatedRoute, private fetch: FetchServiceService) {
    this.route.params.subscribe(params => {
      this.fetch.getProductByName(params.productName).subscribe(data => {
        if(!data) this.isFound = false
        else this.productData = data
      })
    })
   }

  ngOnInit(): void {
  }

  incrementSelectedNumber(num){
    if(this.selectedNumber + num > 0 && this.selectedNumber + num <= this.productData.quantity)
      this.selectedNumber += num
  }

  checkValidness(input){
    var num = parseInt(input.target.value)
    if(num < 1) this.selectedNumber = 1
    else if(num > this.productData.quantity) this.selectedNumber = this.productData.quantity
    else this.selectedNumber = num
    input.target.value = this.selectedNumber
  }

}
