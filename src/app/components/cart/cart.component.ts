import { Component, OnInit, OnDestroy } from '@angular/core';
import { cartInterface, userData } from '../../interfaces'
import { FetchServiceService } from '../../services/fetch-service.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
var mongoose = require('mongoose');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnDestroy {

  cart : Array<cartInterface> = []
  isLoaded = false
  summedPrice = 0

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private cartService: CartService,
    private fetch: FetchServiceService,
    private breakpointObserver: BreakpointObserver,
    private user: UserService) {
    let tmpCart = this.cartService.getProductsInCart() || []
    let resolved = 0
    if(tmpCart.length > 0){
      tmpCart.forEach(p => this.fetch.getProductById(p.productID).toPromise()
        .then(
          res => {
            this.cart.push( { product: res, quantity: p.quantity } )
            if(++resolved >= tmpCart.length){
              this.summedPrice = this.calculateSummedPrice()
              this.isLoaded = true
            }
          }
        ))

    }
    else this.isLoaded = true
  }

  async ngOnDestroy() {
    const loggedIn = await (await this.user.isLoggedIn().toPromise()).status
    await this.cartService.saveNewCart(this.cart)
    if(loggedIn != (await this.user.isLoggedIn().toPromise()).status)
      this.cartService.clearLocalCart()

  }

  increaseNumItem(item: cartInterface, num: number){
    if(item.product.quantity >= item.quantity + num)
      if(item.quantity + num >= 0){
        item.quantity+=num
        this.summedPrice = this.calculateSummedPrice()
      }
      else
        return
    else
      console.log("Brak wystarczającej ilości w magazynie")
  }

  removeElementFromCart(itemID: string){
    console.log("removing")
    this.cartService.deleteProductFromCart(itemID)
    var index = this.cart.indexOf(this.cart.find(p => mongoose.Types.ObjectId(p.product._id) == itemID));
    this.cart.splice(index, 1)
    this.summedPrice = this.calculateSummedPrice()
  }

  calculateSummedPrice(): number{
    return Math.round((this.cart.reduce((acc, p) => acc + p.quantity * p.product.price, 0) + Number.EPSILON) * 100) / 100
  }

}