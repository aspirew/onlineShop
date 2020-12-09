import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from '../../services/fetch-service.service';
import { CartService } from '../../services/cart.service';

import { productData } from '../../interfaces'
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('500ms ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('500ms ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ProductsComponent implements OnInit {

  breakpoint = null
  tiles : Array<productData> = []
  allLoadedResults : Array<productData> = []
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
    if(this.allLoadedResults.length > 0){
      this.tiles = this.allLoadedResults.slice(this.productsPerPage * (page - 1), this.productsPerPage * page)
    }
    else{
      this.fetch.getSomeProducts(page, this.productsPerPage).subscribe(data => {
        this.tiles = data.filter(o => o.quantity > 0)
      })
    }
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
    return name.split(" ").join("-")
  }

  searchButtonClick(){
    if(!this.searchPhrase) alert("wpisz cos xD")
    else this.router.navigate(['/products/search', this.searchPhrase])
  }

  async search(){
    this.tiles = null
    this.noResults = false
    console.log(this.searchPhrase)
    this.fetch.searchProducts(this.searchPhrase).subscribe(res => {
      console.log(res)
      this.page = 1
      this.tiles = res
      this.allPages = Math.floor(res.length / this.productsPerPage)
      if(res.length % this.productsPerPage != 0) this.allPages++
      this.allLoadedResults = res
      if(this.allLoadedResults.length > 0) this.setPage(this.page)
      else this.noResults = true
    })
    }

  closePrompt(){
    this.promptedProduct = null
  }
  }
