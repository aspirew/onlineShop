import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  breakpoint = null

  tiles = [
    {text: 'One', price: 20},
    {text: 'Two', price: 10},
    {text: 'Three', price: 14},
    {text: 'Four', price: 54},
  ];

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = Math.floor(window.innerWidth / 400)
  }

  onResize(event){
    this.breakpoint = Math.floor(event.target.innerWidth / 400)
  }

  addToCart(){
    console.log("Pressed")
  }


}
