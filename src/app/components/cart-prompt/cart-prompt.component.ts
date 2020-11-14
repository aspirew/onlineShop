import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/interfaces';

@Component({
  selector: 'app-cart-prompt',
  templateUrl: './cart-prompt.component.html',
  styleUrls: ['./cart-prompt.component.css']
})
export class CartPromptComponent implements OnInit {

  @Input() product: productData
  @Output() closeEvent = new EventEmitter();

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  exitPrompt(){
    this.closeEvent.emit()
  }

  getDecodedUri(name: String){
    return name.split(" ").join("-")
  }

}
