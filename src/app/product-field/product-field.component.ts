import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'

@Component({
  selector: 'product-field',
  templateUrl: './product-field.component.html',
  styleUrls: ['./product-field.component.css']
})
export class ProductFieldComponent implements OnInit {

  constructor(app: AppComponent) { }

  ngOnInit(): void {
  }


}
