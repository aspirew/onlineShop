import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { subscribeOn } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  breakpoint = null
  username = "unknown"

  tiles = [
    {text: 'One', price: 20},
    {text: 'Two', price: 10},
    {text: 'Three', price: 14},
    {text: 'Four', price: 54},
  ];

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.breakpoint = Math.floor(window.innerWidth / 400)
    this.user.getData().subscribe(data => {
      this.username = data.username
    })
  }

  onResize(event){
    this.breakpoint = Math.floor(event.target.innerWidth / 400)
  }

  addToCart(){
    console.log("Pressed")
  }


}
