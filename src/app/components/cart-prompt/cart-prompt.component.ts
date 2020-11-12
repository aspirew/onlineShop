import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productData } from 'src/app/interfaces';

@Component({
  selector: 'app-cart-prompt',
  templateUrl: './cart-prompt.component.html',
  styleUrls: ['./cart-prompt.component.css']
})
export class CartPromptComponent implements OnInit {

  @Input() product: productData
  @Output() closeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  exitPrompt(){
    this.closeEvent.emit()
  }

}
