import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { cartData } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }

  numOfProducts = 0
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  navigate(url: string){ 
    this.router.navigateByUrl(url)
  }

  parseDate(date: Date){
    let weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

    let months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja',
      'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 
      'Listopada', 'Grudnia']

    let weekDay = weekDays[date.getDay()]
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return weekDay + ' ' + day + ' ' + month + ' ' + year
  }

  addItemToCart(itemID: string){
    var productsInCart: Array<cartData> = JSON.parse(localStorage.getItem("cart")) || []
    if(productsInCart == [] || !productsInCart.some(prod => prod.productID == itemID)){
      productsInCart.push( { productID: itemID, quantity: 1 } )
    }
    else{
      console.log("another one")
      productsInCart.map(prod => { if(prod.productID == itemID) prod.quantity++ })
    }

    console.log(productsInCart)
    
    localStorage.setItem("cart", JSON.stringify(productsInCart))
    this.changeNumOfProducts(productsInCart.length)
  }

  getProductsInCart() : Array<cartData>{
    return JSON.parse(localStorage.getItem("cart"))
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

}
