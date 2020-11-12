import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from '../../services/fetch-service.service';
import { CartService } from '../../services/cart.service';

import { productData } from '../../interfaces'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  breakpoint = null
  allTiles = null
  tiles : Array<productData> = []
  page = 1
  allPages = 1
  productsPerPage = 20
  searchPhrase = ""
  noResults = false

  promptedProduct : productData = null

  constructor(
    private fetch: FetchServiceService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  async ngOnInit() {
    this.breakpoint = Math.floor(window.innerWidth / 400)
    this.route.params.subscribe(params => {

    if(Object.keys(params).length != 0){
      this.searchPhrase = params.phrase
      this.search()
    }
    else{
      this.fetch.getNumOfProducts().subscribe(num => {
        this.allPages = Math.floor(num / this.productsPerPage)
        if(this.productsPerPage % num != 0) this.allPages++

      })

      this.setPage(this.page)
    }
  })
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
    const val = parseInt(input.target.value)
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
        this.tiles = data
      })
  }

  async addToCart(tile: productData){
    if(!this.promptedProduct){
      const isAvailable = await this.cartService.addItemToCart(tile._id, 1)
      await this.cartService.updateUserCart()
      if(isAvailable)
        this.promptedProduct = tile
    }
  }

  getDecodedUri(name: String){
    return name.replace(" ", "-")
  }

  searchButtonClick(){
    if(!this.searchPhrase) alert("wpisz cos xD")
    else this.router.navigate(['/products/search', this.searchPhrase])
  }

  async search(){
    this.tiles = null
    this.noResults = false
    this.fetch.searchProducts(this.searchPhrase).subscribe(res => {
      this.page = 1
      this.allPages = Math.floor(res.length / this.productsPerPage)
      if(res.length % this.productsPerPage != 0) this.allPages++
      if(res.length > 0) this.setPage(this.page)
      else this.noResults = true
    })
    }

  closePrompt(){
    this.promptedProduct = null
  }
  }
