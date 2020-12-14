import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/interfaces';
import { FetchServiceService } from 'src/app/services/fetch-service.service';
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
  searchMode = false;
  sentStatus = 3
  cancelledStatus = 2

  perPage = 10
  page = 1
  optionButtonLabel = "Załaduj więcej"
  searchPhrase = ""
  order_status = []

  constructor(private orderService: OrderService, private utils: UtilsService,
    private fetch: FetchServiceService) { }

  ngOnInit(): void {
    this.fetch.getConstants().subscribe(res => {
      this.order_status = res.ORDER_STATUS
    })

    this.orderService.getSomeOrders(this.page, this.perPage).subscribe(ords => {
      this.orders = ords
      this.loaded = true
      console.log(this.orders)
    })
  }

  private fetchOrders(){
    this.loaded = false
    this.orderService.getSomeOrders(this.page, this.perPage).subscribe(ords => {
      this.orders.push(...ords)
      this.loaded = true
      this.optionButtonLabel = "Załaduj więcej"
    })
  }

  loadMore(){
    if(!this.searchMode){
      this.page++
      this.selectedRow = null
      this.fetchOrders()
    }
    else{
      this.reload()
    }

  }

  reload(){
    this.page = 1
    this.selectedRow = null
    this.orders = []
    this.optionButtonLabel = "Załaduj więcej"
    this.fetchOrders()
  }


  searchButtonClick(){
    if(this.searchPhrase.length > 0){
      this.page = 1
      this.searchMode = true
      this.loaded = false
      this.orderService.searchOrders(this.searchPhrase).subscribe(res => {
        this.optionButtonLabel = "Zamknij wyszukiwanie"
        this.orders = res.result
        this.loaded = true
      })
    }
    else alert("Wyszukiwana fraza nie może być pusta")
  }

  changeStatus(status){
    this.orderService.changeStatus(this.selectedRow._id, this.order_status[status]).subscribe(res => {
      if(res.success) {
        alert("changed status succesfully")
        this.reload()
      }
      else alert("couldnt change status")
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

