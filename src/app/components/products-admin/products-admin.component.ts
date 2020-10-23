import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FetchServiceService } from 'src/app/services/fetch-service.service';
import { productData } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  products = new MatTableDataSource([])
  perPage = 20
  page = 1
  beingLoad = true
  displayedColumns = ['name', 'price', 'quantity']
  selectedRow: productData = null
  searchPhrase = ""
  optionButtonLabel = ""
  searchMode = false

  name = ""
  price = 0.0
  quantity = 0

  constructor(private fetch: FetchServiceService, private prodService: ProductService) {}

  ngOnInit() {
    this.fetchProducts()
  }

  ngAfterViewInit(){
    this.products.sort = this.sort
  }

  private fetchProducts(){
    this.beingLoad = true
    this.fetch.getSomeProducts(this.page, this.perPage).subscribe(productsFetched => {
      this.products.data.push(...productsFetched)
      this.beingLoad = false
      this.optionButtonLabel = "Załaduj więcej"
      this.products.sort = this.sort
    })
  }

  select(row: productData){
    this.selectedRow = row
    this.name = row.name
    this.price = row.price
    this.quantity = row.quantity
  }

  edit(){
    if(!this.selectedRow) alert("Należy wybrać produkt")
    else{
      const editData = {
        name: this.name,
        price: this.price,
        quantity: this.quantity
      }
      this.prodService.editProduct(this.selectedRow._id, editData).subscribe(res => {
        if(res.success) {
          alert("Edycja powiodła się!")
          this.reload()
        }
        else alert(`Edycja nie powiodła się! Powód: ${res.message}`)

      })
    }
  }

  searchButtonClick(){
    if(this.searchPhrase.length > 0){
      this.page = 1
      this.searchMode = true
      this.beingLoad = true
      this.fetch.searchProducts(this.searchPhrase).subscribe(res => {
        this.optionButtonLabel = "Zamknij wyszukiwanie"
        this.products.data = res
        this.beingLoad = false
      })
    }
    else alert("Wyszukiwana fraza nie może być pusta")
  }

  loadMore(){
    if(!this.searchMode){
      this.page++
      this.fetchProducts()
    }
    else{
      this.reload()
    }


  }

  reload(){
    this.page = 1
    this.selectedRow = null
    this.products.data = []
    this.optionButtonLabel = "Załaduj więcej"
    this.fetchProducts()
  }

}
