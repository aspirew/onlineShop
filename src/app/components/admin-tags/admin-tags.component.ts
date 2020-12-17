import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { boundTag, tag } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {

  beingLoad = true;
  tags = new MatTableDataSource([])
  newTags = ""
  selectedTags: Array<boundTag> = []
  displayedColumns = ['name', 'isBound']

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.fetchTags()
  }

  select(row: boundTag){

    if(!this.selectedTags.includes(row))
      this.selectedTags.push(row);
    else 
      this.selectedTags = this.selectedTags.filter(e => e != row)
      
  }

  private fetchTags(){
    this.beingLoad = true
    this.productsService.getAllTags().subscribe(tagsFetched => {
      this.tags.data = tagsFetched
      this.beingLoad = false
    })
  }

  addTags(){
    this.productsService.addTags(this.newTags.split(' ')).subscribe(result => {
      alert(result.message)
      this.fetchTags()
    })

  }

  deleteTags(){
    this.productsService.deleteTags(this.selectedTags.map(t => t.tag)).subscribe(result => {
      alert(result.message)
      this.fetchTags()
    })
  }

  parseBoolean(val){
    if(val) return "Przypisany"
    else return "Nieprzypisany"
  }

}
