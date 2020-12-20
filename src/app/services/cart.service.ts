import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { cartData, cartInterface, order } from '../interfaces';
import { FetchServiceService } from './fetch-service.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

interface status {
  success: boolean,
  message: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfProducts = 0
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private fetch: FetchServiceService, private user: UserService, private http: HttpClient) { }

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
          this.updateLocalCart(productsInCart)
        return true

    }
    else {
      alert("Brak wystarczającej ilości towaru w magazynie")
      return false
    }

  }

  private async updateLocalCart(productsInCart: Array<cartData>){
    localStorage.setItem("cart", JSON.stringify(productsInCart))
    this.changeNumOfProducts(productsInCart.length)
  }

  async updateUserCart(){
    const cart = this.getProductsInCart()
    if((await this.user.isLoggedIn().toPromise()).status)
      console.log(await this.user.updateUserCart(cart).toPromise())
  }

  checkProductAvailable(itemID, toPutIntoCart, alreadyInCart): Promise<boolean> {

    return this.fetch.getProductById(itemID).toPromise().then(res => {

      console.log(res?.quantity - alreadyInCart - toPutIntoCart)
      
      if(res?.quantity - alreadyInCart - toPutIntoCart >= 0) {
        return true
      }

      return false

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
        this.updateLocalCart(cart)
        return true
      }
      else return false
  }

  getProductsInCart() : Array<cartData>{
    return JSON.parse(localStorage.getItem("cart"))
  }

  async saveNewCart(cart: Array<cartInterface>){
    let tmpCart = new Array<cartData>()

    for (let p of cart){
      if(!await this.checkProductAvailable(p.product._id, 1, p.quantity)){
        p = await this.setMaximumAvailable(p)
      }
      if(p) tmpCart.push( {productID: p.product._id, quantity: p.quantity })
    }
    this.updateLocalCart(tmpCart)
    this.updateUserCart()

  }

  async loadUserCartData(){

    let userCart = (await this.user.getData().toPromise()).cart
    if(userCart.length > 0){
      for (const product of userCart){
        await this.addItemToCart(product.productID, product.quantity)
      }
    }
  }

  clearLocalCart(){
    localStorage.setItem("cart", JSON.stringify(null))
    this.changeNumOfProducts(0)
  }

  changeNumOfProducts(number){
    this.numOfProducts = number
    this.emitChangeSource.next(this.numOfProducts)
  }

  getNumOfProductsInCart(){
    let cart = JSON.parse(localStorage.getItem("cart"))
    if(cart) return cart.length
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

  createNewOrder(cart: order){

    return this.http.post<status>('/api/order/create', cart)
  }

}
