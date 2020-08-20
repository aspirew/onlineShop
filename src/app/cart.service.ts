import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { cartData, cartInterface } from './interfaces';
import { FetchServiceService } from './fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfProducts = 0
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private fetch: FetchServiceService) { }

  async addItemToCart(itemID, numOfItems: number){

    if(await this.checkProductAvailable(itemID, numOfItems, this.getTotalNumOfProductsInCart(itemID))){

        var productsInCart: Array<cartData> = JSON.parse(localStorage.getItem("cart")) || []
        if(productsInCart == [] || !productsInCart.some(prod => prod.productID == itemID)){
          if(numOfItems > 0)
            productsInCart.push( { productID: itemID, quantity: numOfItems } )
          }
          else{
            productsInCart.map((prod, index) => { if(prod.productID == itemID) {
                prod.quantity+=numOfItems 
                if(prod.quantity <= 0){
                  productsInCart.splice(index, 1)
                }
              }
            })
          }
          this.updateCart(productsInCart)
        
        return true

    }
    else {
      alert("Brak wystarczającej ilości towaru w magazynie")
      return false
    }

  }

  private updateCart(productsInCart: Array<cartData>){
    localStorage.setItem("cart", JSON.stringify(productsInCart))
    this.changeNumOfProducts(productsInCart.length)
  }

  checkProductAvailable(itemID, toPutIntoCart, alreadyInCart): Promise<boolean> {

    return this.fetch.getProductById(itemID).toPromise().then(res => {

      if(res.quantity - alreadyInCart - toPutIntoCart < 0) {
        return false
      }

      return true

    })
  }

  async setMaximumAvailable(item: cartInterface): Promise<cartInterface> {
    let quantity = (await this.fetch.getProductById(item.product._id).toPromise()).quantity
    if(quantity == 0) return null
    return {product: item.product, quantity: quantity}
  } 

  deleteProductFromCart(itemID){
    let cart : Array<cartData> = JSON.parse(localStorage.getItem("cart")) || []
    var index = cart.indexOf(cart.find(p => p.productID == itemID));
      if (index > -1) {
        cart.splice(index, 1);
        this.updateCart(cart)
        return true
      }
      else return false
  }

  getProductsInCart() : Array<cartData>{
    return JSON.parse(localStorage.getItem("cart"))
  }

  async saveNewCart(cart: Array<cartInterface>){
    let tmpCart = new Array<cartData>()
    console.log(cart)

    for (let p of cart){
      if(!await this.checkProductAvailable(p.product._id, 1, p.quantity)){
        p = await this.setMaximumAvailable(p)
      }
      if(p) tmpCart.push( {productID: p.product._id, quantity: p.quantity })
    }
    this.updateCart(tmpCart)

  }

  changeNumOfProducts(number){
    this.numOfProducts = number
    this.emitChangeSource.next(this.numOfProducts)
  }

  getNumOfProductsInCart(){
    let cart = localStorage.getItem("cart")
    if(cart) return JSON.parse(cart).length
    else return 0
  }

  getTotalNumOfProductsInCart(cartItem=null){
    let cart : Array<cartData> = JSON.parse(localStorage.getItem("cart")) || []
    if(!cartItem){
      return cart.reduce((p1, p2) => p1 + p2.quantity, 0)
    }
    else{
      return cart.find(p => p.productID == cartItem)?.quantity || 0
    }
  }

}
