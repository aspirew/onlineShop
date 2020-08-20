import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from '../fetch-service.service';
import { UtilsService } from '../utils.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  breakpoint = null
  allTiles = null
  tiles = null
  page = 1
  allPages = 1
  productsPerPage = 20
  constructor(
    private fetch: FetchServiceService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.breakpoint = Math.floor(window.innerWidth / 400)

    this.fetch.getNumOfProducts().subscribe(num => {
      this.allPages = Math.floor(num / this.productsPerPage)
      if(this.productsPerPage % num != 0) this.allPages++
    })

    this.setPage(this.page)

  }

  onResize(event){
    this.breakpoint = Math.floor(event.target.innerWidth / 400)
  }

  turnPage(num){
    if(this.page + num > 0 && this.page + num <= this.allPages){
      this.page += num
      this.setPage(this.page)
    }
  }

  turnToDesiredPage(input){
    const val = input.target.value
    if(val > 0 && val <= this.allPages) {
      this.page = val
      console.log(this.page)
      this.setPage(this.page)
    }
    input.target.value = this.page
  }

  setPage(page){
    this.tiles = null
    this.fetch.getSomeProducts(page, this.productsPerPage).subscribe(data => {
      this.tiles = data.filter(o => o.quantity > 0)
    })
  }

  addToCart(itemID){
    this.cartService.addItemToCart(itemID, 1) 
  }

  getDecodedUri(name: String){
    return name.replace(" ", "-")
  }


}
