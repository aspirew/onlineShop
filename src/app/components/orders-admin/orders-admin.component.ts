import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/interfaces';
import { OrderService } from 'src/app/services/order.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  displayedColumns = ['email', 'value', 'date', 'status']
  selectedRow: order = null
  orders: Array<order> = []
  loaded = false

  constructor(private orderService: OrderService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(ords => {
      this.orders = ords
      this.loaded = true
      console.log(this.orders)
    })
  }

  select(row: order){
    this.selectedRow = row
    console.log(this.selectedRow.deliveryDetails)
  }

  parseDate(date){
    if(date) return this.utils.parseDate(date)
    else return null
  }

}

