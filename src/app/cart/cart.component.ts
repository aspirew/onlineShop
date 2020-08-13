import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { productData } from '../interfaces'
import { FetchServiceService } from '../fetch-service.service';
import { utils } from 'protractor';

interface cartInterface {
  product: productData,
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  cart : Array<cartInterface> = []
  isLoaded = false

  constructor(private utils: UtilsService, private fetch: FetchServiceService) { 
    let tmpCart = this.utils.getProductsInCart()
    let resolved = 0
    if(tmpCart){
      tmpCart.forEach(p => this.fetch.getProductById(p.productID).toPromise()
        .then(
          res => { 
            this.cart.push( { product: res, quantity: p.quantity } )
            if(++resolved == tmpCart.length) this.isLoaded = true
          }
        ))
    }
    else this.isLoaded = true
    
  }

  ngOnInit(): void {
  }

  emptyCart(){
    localStorage.clear()
    this.cart = []
    this.utils.changeNumOfProducts(0)
  }

}
